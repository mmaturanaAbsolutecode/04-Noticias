import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecturarQuery<T>(query: string) {

    query = apiUrl + query;

    return this.http.get<T>(query, { headers });

  }

  getTopHeadlines() {

    this.headLinesPage++;

    return this.ejecturarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinesPage}`);

    // return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=b78bc0a2bd5a4e0099c2b2fec3fa2abf`);
  }

  getTopHeadLinesCategoria(categoria: string) {

    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    
    return this.ejecturarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
