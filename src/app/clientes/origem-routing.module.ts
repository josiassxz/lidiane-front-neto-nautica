import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrigemFormComponent} from './origem-form/origem-form.component';





const routes: Routes = [
  { path: 'origem-form', component: OrigemFormComponent},
  { path: 'origem-form/:id', component: OrigemFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrigemRoutingModule { }
