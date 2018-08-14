import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ArticleCategory } from '../model/model';
import { environment } from '../../environments/environment';


@Injectable()
export class ArticleCategoryService {

  url = `${environment.apiUrl}` + '/articles_category';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.url}`) as Observable<ArticleCategory>;
  }

}








