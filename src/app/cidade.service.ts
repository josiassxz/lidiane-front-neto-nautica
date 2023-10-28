import { Injectable, NgModule } from '@angular/core';
import { Cidade } from './clientes/cidades';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Injectable({
  providedIn: 'root',
})
export class CidadeService {


  constructor(private http: HttpClient) {}

  salvar(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(
      'http://localhost:8080/cidades',
      cidade
    );
  }

  atualizar(cidade: Cidade): Observable<any> {
    return this.http.put<Cidade>(
      `http://localhost:8080/cidades/${cidade.id}`,
      cidade
    );
  }

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>('http://localhost:8080/cidades');
  }

  getCidadeById(id: number): Observable<Cidade> {
    return this.http.get<any>(`http://localhost:8080/cidades/${id}`);
  }

  deletar(cidade: Cidade): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/cidades/${cidade.id}`
    );
  }
}
