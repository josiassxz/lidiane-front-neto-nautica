import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CidadesFormComponent } from './cidade-form/cidade-form.component';





const routes: Routes = [
  { path: 'cidade-form', component: CidadesFormComponent},
  { path: 'cidade-form/:id', component: CidadesFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CidadesRoutingModule { }
