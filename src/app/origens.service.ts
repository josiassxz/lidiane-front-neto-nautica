import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import { Origem } from './clientes/origens';

@Injectable({
  providedIn: 'root',
})
export class OrigemService {

  constructor(private http: HttpClient) {}

  salvar(origem: Origem): Observable<Origem> {
    return this.http.post<Origem>(
      'http://localhost:8080/origem',
      origem
    );
  }

  atualizar(origem: Origem): Observable<any> {
    return this.http.put<Origem>(
      `http://localhost:8080/origem/${origem.id}`,
      origem
    );
  }

  getOrigems(): Observable<Origem[]> {
    return this.http.get<Origem[]>('http://localhost:8080/origem');
  }

  getOrigemById(id: number): Observable<Origem> {
    return this.http.get<any>(`http://localhost:8080/origem/${id}`);
  }

  deletar(origem: Origem): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/origem/${origem.id}`
    );
  }
}
