import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { TipoProcessoRoutingModule } from './tipo-processo-routing.module';
import { TipoProcessoFormComponent } from './tipo-processo-form/tipo-processo-form.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from "ngx-pagination";
@NgModule({
  declarations: [
    TipoProcessoFormComponent,
  ],
    imports: [
        CommonModule,
        TipoProcessoRoutingModule,
        FormsModule,
        TextMaskModule,
        BrowserModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
  exports: [TipoProcessoFormComponent],
})
export class TipoProcessoModule {
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
