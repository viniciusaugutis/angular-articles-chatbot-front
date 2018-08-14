import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

export class QuestionFilter {
  articleCategoryId: string;
}

@Injectable()
export class QuestionService {

  url = `${environment.apiUrl}` + '/questions';

  constructor(private http: HttpClient) {
  }

  findAll(questionFilter: QuestionFilter): Observable<any> {

    let params = new HttpParams();

    if (questionFilter.articleCategoryId) {
      params = params.append('articleCategoryId', questionFilter.articleCategoryId);
    }

    return this.http.get(`${this.url}`, {
      params: params
    });

  }

}








