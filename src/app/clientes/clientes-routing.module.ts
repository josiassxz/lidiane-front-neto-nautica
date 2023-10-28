import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientesFormComponent} from './clientes-form/clientes-form.component'
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClientesReciboComponent } from './clientes-recibo/clientes-recibo.component';




const routes: Routes = [
  { path: 'clientes-form', component: ClientesFormComponent},
  { path: 'clientes-form/:id', component: ClientesFormComponent},
  { path: 'clientes-lista', component: ClientesListaComponent },
  { path: 'clientes-recibo/:id', component: ClientesReciboComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
