import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import {add, format, parseISO} from 'date-fns';
import { Cliente } from '../cliente';
import { CidadeService } from '../../cidade.service'
import { ClientesService } from '../../clientes.service';
import { FormControl } from '@angular/forms';







@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css'],
})
export class ClientesListaComponent implements OnInit {
  totalLength: any;
  p = 0;
  page: number = 0;
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;
  model: any;
  filtroCliente: Cliente;
  totalValorServico: any;
  totalValorRecebido: any;
  totalValorAreceber: any;
  totalValorLiquido: any;
  totalGru: any;

  public exportarPlanilha(): any[] {
    this.totalValorServico = this.clientes.reduce((acc, cliente) => acc + (+cliente.valorServico || 0), 0)
    this.totalValorRecebido = this.clientes.reduce((acc, cliente) => acc + (+cliente.recebibo || 0), 0)
    this.totalValorAreceber = this.clientes.reduce((acc, cliente) => acc + (+cliente.areceber || 0), 0)
    this.totalValorLiquido = this.clientes.reduce((acc, cliente) => acc + (+cliente.valorLiquido || 0), 0)
    this.totalGru = this.clientes.reduce((acc, cliente) => acc + (+cliente.gru || 0), 0)


    return this.clientes.map(object => ({
      Semana: object.semana ? format(add(parseISO(object.semana), { days: 1 }), 'dd/MM/yyyy') : '-',
      Cliente: object.nome || '-',
      Cidade: object.cidade || '-',
      Capitania: object.captania,
      TipoProc: object.tipoProcesso || '-',
      NomeEMBARC: object.numEmbarc || '-',
      Origem: object.origem || '-',
      FormaPGTO: object?.formPgto || '-',
      Banco: object?.banco || '-',
      DataRecebimento: object?.dataReceb ? format(add(parseISO(object.dataReceb), { days: 1 }), 'dd/MM/yyyy') : '-',
      CaixaRecebido: object?.caixaRecebido ? format(add(parseISO(object.caixaRecebido), { days: 1 }), 'dd/MM/yyyy') : '-',
      ValorServico: object?.valorServico ? this.formatMoney(Number(object.valorServico)) : '-',
      Recebido: object?.recebibo ? this.formatMoney(Number(object.recebibo)) : '-',
      AReceber: object?.areceber ? this.formatMoney(Number(object.areceber)) : '-',
      SituacaoPagamento: object?.situacaoPagamento || '-',
      GRU: object?.gru ? this.formatMoney(Number(object.gru)) : '-',
      ValorLiquido: object?.valorLiquido ? this.formatMoney(Number(object.valorLiquido)) : '-',
    }));
  }








  public formatMoney(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  public somarCampo(objetos, campo) {
    return objetos.reduce((total, obj) => total + Number(obj[campo]), 0);
  }



  downloadXls() {
    const workSheet = XLSX.utils.json_to_sheet(this.exportarPlanilha()); // chamar a função exportarPlanilha

    // Adicione uma nova linha com os totais
    const totalValues = {
      totalValorServico: this.formatMoney(this.totalValorServico),
      totalValorRecebido: this.formatMoney(this.totalValorRecebido),
      totalValorAreceber: this.formatMoney(this.totalValorAreceber),
      totalGru: this.formatMoney(this.totalGru),
      totalValorLiquido: this.formatMoney(this.totalValorLiquido)
      
    };

    // Converta a nova linha em uma matriz de valores
    const totalRowValues: unknown[] = Object.values(totalValues);

    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "dados");

    // Adicione uma linha vazia antes dos totais
    XLSX.utils.sheet_add_aoa(workSheet, [[]], { origin: -1 });

    // Adicione a nova linha como a última linha no objeto worksheet
    XLSX.utils.sheet_add_aoa(workSheet, [[...Object.keys(totalValues)]], { origin: -1 });
    XLSX.utils.sheet_add_aoa(workSheet, [totalRowValues], { origin: -1 });

    //buffer
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Donwload
    XLSX.writeFile(workBook, `Clientes.xlsx`);
  }






  constructor(private service: ClientesService, private router: Router, private cidadesService: CidadeService) {}

  ngOnInit(): void {
    this.filtroCliente = new Cliente();
    this.service
      .getClientes()
      .subscribe((resposta) => (this.clientes = resposta));
      // this.carregarCidades(); 
  }

  // carregarCidades() {
  //   this.cidadesService.getCidades().subscribe((cidades) => {
  //   });
  // }

  novoCadastro() {
    this.router.navigate(['/clientes-form']);
  }

  novaCidade() {
    this.router.navigate(['/cidade-form']);
  }

  novaOrigem() {
    this.router.navigate(['/origem-form']);
  }

  novoTipoProcesso() {
    this.router.navigate(['/tipo-processo-form']);
  }

  imprimir() {
    window.print();
  }

  





  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    this.deletarCliente();
  }

  deletarCliente() {
    this.service.deletar(this.clienteSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Cliente deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.')
    );
  }
  typeahead: FormControl = new FormControl();

  nomeFiltro = 'nome';

  onChangeSearch(val: string) {
    this.nomeFiltro = val;
  }



  onFocused(e) {
    // do something when input is focuse
  }
  pesquisaTeste() {
    this.service
      .findSearchNome(this.nomeFiltro)
      .subscribe((resposta) => (this.clientes = resposta));
  }

  tablePrint() {
    window.onafterprint = () => window.close();
    setTimeout(() => window.print(), 1000);
  }

  total(campo) {
      let total = 0;
      this.clientes.forEach(e =>
      {
        total += Number(e[campo]);
      });
      return total;
  }
  pesquisaAvancada(){
    this.service
      .pesquisaAvancada(this.filtroCliente)
      .subscribe((resposta) => (this.clientes = resposta));
  }

  limpar(){
    this.filtroCliente = new Cliente();
  }







}
