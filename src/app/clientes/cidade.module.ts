import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { CidadesRoutingModule } from './cidade-routing.module';
import { CidadesFormComponent } from './cidade-form/cidade-form.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from "ngx-pagination";
@NgModule({
  declarations: [
    CidadesFormComponent
  ],
    imports: [
        CommonModule,
        CidadesRoutingModule,
        FormsModule,
        TextMaskModule,
        BrowserModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
  exports: [CidadesFormComponent ],
})
export class CidadeModule {
  public maskDate = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
}
export class NgbdDropdownBasicModule {}
