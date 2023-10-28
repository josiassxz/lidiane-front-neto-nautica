
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TipoProcesso } from '../tipo_processo';
import { TipoProcessoService } from '../../tipo-processo.service';
import { Observable } from 'rxjs';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';



@Component({
  selector: 'app-tipo-processo-form',
  templateUrl: './tipo-processo-form.component.html',
  styleUrls: ['./tipo-processo-form.component.css']
})
export class TipoProcessoFormComponent implements OnInit {

  tipoProcesso: TipoProcesso;
  success = false;
  errors: string[];
  id: number;
  



  constructor(private service: TipoProcessoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.tipoProcesso = new TipoProcesso();
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
        this.id = urlParams.id;
        if (this.id){
          this.service
            .getTipoProcessoById(this.id)
            .subscribe(
              response => this.tipoProcesso = response ,
              errorResponse => this.tipoProcesso = new TipoProcesso()
            );
        }
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
        .atualizar(this.tipoProcesso)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o tipo processo.'];
        });


    }else{

      this.service
        .salvar(this.tipoProcesso)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.tipoProcesso = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          });

    }

  }



  montaObjetoParaSalvar(){
    this.tipoProcesso.tipoProcesso;
  }
  

}
