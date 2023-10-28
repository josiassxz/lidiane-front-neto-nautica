import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { OrigemRoutingModule } from './origem-routing.module';
import { OrigemFormComponent } from './origem-form/origem-form.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from "ngx-pagination";
@NgModule({
  declarations: [
    OrigemFormComponent,
  ],
    imports: [
        CommonModule,
        OrigemRoutingModule,
        FormsModule,
        TextMaskModule,
        BrowserModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
  exports: [OrigemFormComponent],
})
export class OrigemModule {
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
