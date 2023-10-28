
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cidade } from '../cidades';
import { CidadeService } from '../../cidade.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadesFormComponent implements OnInit {

  cidade: Cidade;
  success = false;
  errors: string[];
  id: number;
  



  constructor(private service: CidadeService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.cidade = new Cidade();
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
        this.id = urlParams.id;
        if (this.id){
          this.service
            .getCidadeById(this.id)
            .subscribe(
              response => this.cidade = response ,
              errorResponse => this.cidade = new Cidade()
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
        .atualizar(this.cidade)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar a cidade.'];
        });


    }else{

      this.service
        .salvar(this.cidade)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.cidade = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          });

    }

  }


  montaObjetoParaSalvar(){
    this.cidade.cidade;
  }




}
