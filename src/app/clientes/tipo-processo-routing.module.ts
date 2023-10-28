import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoProcessoFormComponent } from './tipo-processo-form/tipo-processo-form.component';




const routes: Routes = [
  { path: 'tipo-processo-form', component: TipoProcessoFormComponent},
  { path: 'tipo-processo/:id', component: TipoProcessoFormComponent},
  { path: 'tipo-processo', component: TipoProcessoFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProcessoRoutingModule { }
