import { Injectable, NgModule } from '@angular/core';
import { TipoProcesso } from './clientes/tipo_processo';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Injectable({
  providedIn: 'root',
})
export class TipoProcessoService {


  constructor(private http: HttpClient) {}

  salvar(tipoProcesso: TipoProcesso): Observable<TipoProcesso> {
    return this.http.post<TipoProcesso>(
      'http://localhost:8080/tipos-processo',
      tipoProcesso
    );
  }

  atualizar(tipoProcesso: TipoProcesso): Observable<any> {
    return this.http.put<TipoProcesso>(
      `http://localhost:8080/tipos-processo/${tipoProcesso.id}`,
      tipoProcesso
    );
  }

  getTiposProcessos(): Observable<TipoProcesso[]> {
    return this.http.get<TipoProcesso[]>('http://localhost:8080/tipos-processo');
  }

  getTipoProcessoById(id: number): Observable<TipoProcesso> {
    return this.http.get<any>(`http://localhost:8080/tipos-processo/${id}`);
  }

  deletar(tipoProcesso: TipoProcesso): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/tipos-processo/${tipoProcesso.id}`
    );
  }
}
