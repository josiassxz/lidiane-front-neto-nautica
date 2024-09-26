import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import {add, format, parseISO} from 'date-fns';
import { Cliente } from '../cliente';
import { CidadeService } from '../../cidade.service'
import { ClientesService } from '../../clientes.service';
import { FormControl } from '@angular/forms';
import { OrigemService } from '../../origens.service'
import { Origem } from '../origens';
import html2pdf from 'html2pdf.js';
import { HttpClient } from '@angular/common/http';







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
  origens: Origem[] = [];

  public exportarPlanilha(): any[] {
    // Cálculo dos totais
    this.totalValorServico = this.clientes.reduce((acc, cliente) => acc + (+cliente.valorServico || 0), 0);
    this.totalValorRecebido = this.clientes.reduce((acc, cliente) => acc + (+cliente.recebibo || 0), 0);
    this.totalValorAreceber = this.clientes.reduce((acc, cliente) => acc + (+cliente.areceber || 0), 0);
    this.totalValorLiquido = this.clientes.reduce((acc, cliente) => acc + (+cliente.valorLiquido || 0), 0);
    this.totalGru = this.clientes.reduce((acc, cliente) => acc + (+cliente.gru || 0), 0);

    // Ordenar os clientes por nome em ordem alfabética, removendo espaços antes e depois do nome
    const sortedClientes = [...this.clientes].sort((a, b) => {
        const nomeA = a.nome?.trim().toLowerCase() || ''; // Remover espaços antes e depois
        const nomeB = b.nome?.trim().toLowerCase() || ''; // Remover espaços antes e depois
        return nomeA.localeCompare(nomeB);
    });

    // Retornar os dados formatados
    return sortedClientes.map(object => ({
        Semana: object.semana ? format(add(parseISO(object.semana), { days: 1 }), 'dd/MM/yyyy') : '-',
        Cliente: object.nome?.trim() || '-', // Remover espaços antes e depois ao exibir o nome
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



  carregarOrigems() {
    this.origemService.getOrigems().subscribe((origens) => {
      this.origens = origens;
    });
  }



  downloadXls() {
    const workSheet = XLSX.utils.json_to_sheet(this.exportarPlanilha()); // Chamar a função exportarPlanilha

    // Adicione uma nova linha com os totais
    const totalValues = {
        totalValorServico: this.formatMoney(this.totalValorServico),
        totalValorRecebido: this.formatMoney(this.totalValorRecebido),
        totalValorAreceber: this.formatMoney(this.totalValorAreceber),
        totalGru: this.formatMoney(this.totalGru),
        totalValorLiquido: this.formatMoney(this.totalValorLiquido)
    };

    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "dados");

    // Define a origem para os títulos e valores de totais
    const originColumn = 12; // Coluna específica, por exemplo, a 12ª coluna
    const range = XLSX.utils.decode_range(workSheet['!ref']); // Obtém o intervalo de células

    // Adicionar os títulos na linha correspondente
    const headerTitles = Object.keys(totalValues);
    const headerRowRef = XLSX.utils.encode_cell({ c: originColumn, r: range.e.r + 2 }); // Linha onde você quer que os títulos apareçam
    XLSX.utils.sheet_add_aoa(workSheet, [headerTitles], { origin: headerRowRef });

    // Formatar os títulos em negrito
    headerTitles.forEach((title, index) => {
        const cellAddress = XLSX.utils.encode_cell({ c: originColumn + index, r: range.e.r + 2 });
        if (!workSheet[cellAddress]) workSheet[cellAddress] = { v: title }; // Garante que a célula tenha valor e exista
        workSheet[cellAddress].s = {
            font: {
                bold: true // Define a fonte em negrito
            }
        };
    });

    // Adicionar os valores totais logo abaixo dos títulos
    const totalRowRef = XLSX.utils.encode_cell({ c: originColumn, r: range.e.r + 3 }); // Linha para os totais, logo abaixo dos títulos
    XLSX.utils.sheet_add_aoa(workSheet, [Object.values(totalValues)], { origin: totalRowRef });

    // Definir estilos (negrito) para os totais
    Object.values(totalValues).forEach((_, index) => {
        const totalCellAddress = XLSX.utils.encode_cell({ c: originColumn + index, r: range.e.r + 3 });
        if (!workSheet[totalCellAddress]) workSheet[totalCellAddress] = {}; // Garante que a célula exista
        workSheet[totalCellAddress].s = {
            font: {
                bold: true // Negrito também nos totais (opcional)
            }
        };
    });

    //buffer
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, `Clientes.xlsx`);
}










  constructor(private service: ClientesService, private router: Router, private cidadesService: CidadeService, private origemService: OrigemService, private http: HttpClient) {}

  ngOnInit(): void {
    this.filtroCliente = new Cliente();
    this.service
      .getClientes()
      .subscribe((resposta) => (this.clientes = resposta));
      this.carregarOrigems();
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


  downloadPDF(clienteId: number) {
    // Navegar para a página do recibo
    this.router.navigate(['/clientes-recibo', clienteId]).then(() => {
      // Esperar um pouco para garantir que a página seja renderizada
      setTimeout(() => {
        // Capturar o conteúdo da página
        const element = document.body;
        const opt = {
          margin: [6,6,7,7],
          filename: `recibo-cliente-${clienteId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Gerar e baixar o PDF
        html2pdf().from(element).set(opt).save().then(() => {
          // Voltar para a página anterior após o download
          this.router.navigate(['../clientes-lista']);
          setTimeout(function() {
            location.reload();
          }, 2000);
          
        });
      }, 1000); // Ajuste este tempo conforme necessário
    });
  }
}

  







