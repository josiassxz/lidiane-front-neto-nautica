import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {ClientesListaComponent} from "./clientes/clientes-lista/clientes-lista.component";
import { CidadesFormComponent } from './clientes/cidade-form/cidade-form.component';
// import { TipoProcessoFormComponent } from './clientes/tipo-processo-form/tipo-processo-form.component';
import { OrigemFormComponent } from './clientes/origem-form/origem-form.component';
import { TipoProcessoFormComponent } from './clientes/tipo-processo-form/tipo-processo-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes-lista', pathMatch: 'full'},
  {path: 'clientes-lista', component: ClientesListaComponent},
  { path: 'cidade-form', component: CidadesFormComponent },
  { path: 'tipo-processo-form', component: TipoProcessoFormComponent },
  { path: 'origem-form', component: OrigemFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
