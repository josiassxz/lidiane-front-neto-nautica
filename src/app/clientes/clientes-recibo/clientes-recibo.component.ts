
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clientes-recibo',
  templateUrl: './clientes-recibo.component.html',
  styleUrls: ['./clientes-recibo.component.css']
})
export class ClientesReciboComponent implements OnInit {

  cliente: Cliente;
    success: boolean = false;
    errors: string[];
    id: number;



    constructor(private service: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) {
      this.cliente = new Cliente();
    }

    ngOnInit(): void {
      const params: Observable<Params> = this.activatedRoute.params;
      params.subscribe( urlParams => {
          this.id = urlParams['id'];
          if (this.id){
            this.service
              .getClienteById(this.id)
              .subscribe(
                response => this.cliente = response ,
                errorResponse => this.cliente = new Cliente()
              );
          }
      });
    }








    onSubmit(){
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

  }


