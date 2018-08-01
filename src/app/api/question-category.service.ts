import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuestionCategory } from './../model/model';
import { environment } from './../../environments/environment';


@Injectable()
export class QuestionCategoryService {

  url = `${environment.apiUrl}` + '/questions_category';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.url}`) as Observable<QuestionCategory>;
  }

}








