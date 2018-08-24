import { Article } from './../model/model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';

@Injectable()
export class ArticleService {

  private articleUrl = `${environment.apiUrl}` + '/articles';

  constructor(private http: HttpClient) {
  }

  public findAllArticles(filter: any): Observable<any> {
    let params = new HttpParams();

    if (filter.page) {
      params = params.append('page', filter.page);
    } else {
      params = params.append('page', '0');
    }

    if (filter.size) {
      params = params.append('size', filter.size);
    } else {
      params = params.append('size', '15');
    }

    return this.http.get(`${this.articleUrl}`, {
      params: params
    });

  }

  public findById(id: string): Observable<Article> {
    return this.http.get(`${this.articleUrl}/${id}`) as Observable<Article>;
  }

  public create(article: Article): Observable<Article> {
    let options = new HttpHeaders();
    options = options.append('Content-Type', 'application/json');
    return this.http.post(`${this.articleUrl}`, JSON.stringify(article), { headers: options}) as Observable<Article>;
  }

}
