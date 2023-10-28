
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Origem } from '../origens';
import { OrigemService } from '../../origens.service';
import { Observable } from 'rxjs';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';



@Component({
  selector: 'app-origem-form',
  templateUrl: './origem-form.component.html',
  styleUrls: ['./origem-form.component.css']
})
export class OrigemFormComponent implements OnInit {

  origem: Origem;
  success = false;
  errors: string[];
  id: number;
  



  constructor(private service: OrigemService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.origem = new Origem();
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
        this.id = urlParams.id;
        if (this.id){
          this.service
            .getOrigemById(this.id)
            .subscribe(
              response => this.origem = response ,
              errorResponse => this.origem = new Origem()
            );
        }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista']);
  }





  onSubmit(){
    this.montaObjetoParaSalvar();
    if (this.id){

      this.service
        .atualizar(this.origem)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar a origem.'];
        });


    }else{

      this.service
        .salvar(this.origem)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.origem = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          });

    }

  }


  montaObjetoParaSalvar(){
    this.origem.origem;
}





}
