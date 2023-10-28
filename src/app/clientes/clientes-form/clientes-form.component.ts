
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../cliente';
import { Cidade } from '../cidades';
import { Origem } from '../origens';
import { TipoProcesso } from '../tipo_processo';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import { CidadeService } from '../../cidade.service'
import { OrigemService } from '../../origens.service'
import { TipoProcessoService } from '../../tipo-processo.service'




@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success = false;
  errors: string[];
  id: number;
  cidades: Cidade[] = [];
  tipoPprocesso: TipoProcesso[] = [];
  origens: Origem[] = [];
  



  constructor(private service: ClientesService, private router: Router,
     private activatedRoute: ActivatedRoute,
      private origemService: OrigemService,
      private tipoProcessoService: TipoProcessoService,
      private cidadesService: CidadeService) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
        this.id = urlParams.id;
        if (this.id){
          this.service
            .getClienteById(this.id)
            .subscribe(
              response => this.cliente = response ,
              errorResponse => this.cliente = new Cliente()
            );
        }
    });
    this.carregarCidades();
    this.carregarOrigems(); 
    this.carregarTipoProcesso();
  }

  carregarTipoProcesso() {
    this.tipoProcessoService.getTiposProcessos().subscribe((tipoProcesso) => {
      this.tipoPprocesso = tipoProcesso;
    });
  }

  carregarCidades() {
    this.cidadesService.getCidades().subscribe((cidades) => {
      this.cidades = cidades;
    });
  }

  carregarOrigems() {
    this.origemService.getOrigems().subscribe((origens) => {
      this.origens = origens;
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista']);
  }

  mostrarCampoOutroTipoProcesso: boolean = false;



  onSubmit(){
    this.montaObjetoParaSalvar();
    if (this.id){

      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o cliente.'];
        });


    }else{

      this.service
        .salvar(this.cliente)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.cliente = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          });

    }

  }

  valorLiquido(){
    const result = this.cliente.valorServico -  Number(this.cliente.gru);
    return Number.isNaN(result) ? 0 : result;
  }

  valorReceber(){
    const result = this.cliente.valorServico - this.cliente.recebibo;
    return Number.isNaN(result) ? 0 : result;
  }




  montaObjetoParaSalvar(){
    this.cliente.areceber = this.valorReceber();
    this.cliente.valorLiquido = this.valorLiquido();
    this.clienteToUperCase();


  }
  clienteToUperCase(){
    if ( isNotNullOrUndefined(this.cliente.nome )){
      this.cliente.nome = this.cliente.nome.toUpperCase();
    };
    if ( isNotNullOrUndefined(this.cliente.cidade)){
      this.cliente.cidade = this.cliente.cidade.toUpperCase();
    };
    if ( isNotNullOrUndefined(this.cliente.captania)){
      this.cliente.captania = this.cliente.captania.toUpperCase();
    };
    if ( isNotNullOrUndefined(this.cliente.tipoProcesso)){
      this.cliente.tipoProcesso = this.cliente.tipoProcesso.toUpperCase();
    };
    if ( isNotNullOrUndefined( this.cliente.numEmbarc)){
      this.cliente.numEmbarc = this.cliente.numEmbarc.toUpperCase();
    };
    if ( isNotNullOrUndefined(this.cliente.banco )){
      this.cliente.banco = this.cliente.banco.toUpperCase();
    };
    if ( isNotNullOrUndefined( this.cliente.origem)){
      this.cliente.origem = this.cliente.origem.toUpperCase();
    };
    if ( isNotNullOrUndefined(this.cliente.formPgto)){
      this.cliente.formPgto = this.cliente.formPgto.toUpperCase();
    };
    if ( isNotNullOrUndefined( this.cliente.situacaoPagamento)){
      this.cliente.situacaoPagamento = this.cliente.situacaoPagamento.toUpperCase();
    };
    if ( isNotNullOrUndefined( this.cliente.observacao)){
      this.cliente.observacao = this.cliente.observacao.toUpperCase();
    };





  }




}
