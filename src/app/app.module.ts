import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { ClientesModule } from './clientes/clientes.module';
import { ClientesService } from './clientes.service';

import { CidadeModule } from './clientes/cidade.module';
import { OrigemModule } from './clientes/origem.module';
import { TipoProcessoModule } from './clientes/tipo-processo.module';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import ptBr from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {NgxPaginationModule} from "ngx-pagination";
registerLocaleData(ptBr);


@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClientesModule,
    CidadeModule,
    // OrigemModule,
    // TipoProcessoModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule // Nosso módulo recém instalado
  ],
  providers: [ClientesService,  { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
