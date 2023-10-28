import { Injectable, NgModule } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { CidadeService } from './cidade.service'

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import { Cidade } from './clientes/cidades';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  findSearchNome(nomeFiltro: string): Observable<Cliente[]> {
    let params = new HttpParams();
    params = params.append('nomeFiltro', nomeFiltro);
    // params = params.append('_limit', 10);

    return this.http.get<any>(
      'http://localhost:8080/api/clientes/pesquisaFiltro',
      {
        params,
      }
    );
  }

  pesquisaAvancada(filtro: Cliente): Observable<Cliente[]> {
    let params = new HttpParams();
    if (isNotNullOrUndefined(filtro.nome)){
      params = params.append('nome', filtro.nome.toLocaleUpperCase());
    }
    if (isNotNullOrUndefined(filtro.origem)){
      params = params.append('origem', filtro.origem.toLocaleUpperCase());
    }
    if (isNotNullOrUndefined(filtro.dtRecebimentoIni)){
      params = params.append('dtRecebimentoMim', filtro.dtRecebimentoIni);
    }
    if (isNotNullOrUndefined(filtro.dtRecebimentoFin)){
      params = params.append('dtRecebimentoMax', filtro.dtRecebimentoFin);
    }
    if (isNotNullOrUndefined(filtro.dtRecebimento)){
      params = params.append('dtRecebimento', filtro.dtRecebimento);
    }
    if (isNotNullOrUndefined(filtro.situacaoPagamento)){
      params =  params.append('situacao', filtro.situacaoPagamento.toLocaleUpperCase());
    }
    if (isNotNullOrUndefined(filtro.captania)){
      params = params.append('captania', filtro.captania.toLocaleUpperCase());
    }
    if (isNotNullOrUndefined(filtro.semana)){
      params = params.append('semana', filtro.semana);
    }

    return this.http.get<any>(
      'http://localhost:8080/api/clientes/pesquisar',
      {
        params,
      }
    );
  }

  constructor(private http: HttpClient , private cidadesService: CidadeService) {}

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(
      'http://localhost:8080/api/clientes',
      cliente
    );
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(
      `http://localhost:8080/api/clientes/${cliente.id}`,
      cliente
    );
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>('http://localhost:8080/cidades');
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`http://localhost:8080/api/clientes/${id}`);
  }

  buscarPorNome(nome: string): Observable<Cliente[]> {
    return this.http.get<any>(`http://localhost:8080/api/clientes/buscar-por-nome?nome=${nome}`);
  }

  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/api/clientes/${cliente.id}`
    );
  }
}
