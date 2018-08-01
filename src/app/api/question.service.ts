import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuestionCategory } from './../model/model';
import { environment } from './../../environments/environment';

export class QuestionFilter {
  questionCategoryId: string;
}

@Injectable()
export class QuestionService {

  url = `${environment.apiUrl}` + '/questions';

  constructor(private http: HttpClient) {
  }

  findAll(questionFilter: QuestionFilter): Observable<any> {

    let params = new HttpParams();

    if (questionFilter.questionCategoryId) {
      params = params.append('questionCategoryId', questionFilter.questionCategoryId);
    }

    return this.http.get(`${this.url}`, {
      params: params
    });

  }

}








