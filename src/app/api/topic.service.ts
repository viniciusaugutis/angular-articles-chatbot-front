import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

export class TopicFilter {
  articleCategoryId: string;
}

@Injectable()
export class TopicService {

  url = `${environment.apiUrl}` + '/topics';

  constructor(private http: HttpClient) {
  }

  findAll(topicFilter: TopicFilter): Observable<any> {

    let params = new HttpParams();

    if (topicFilter.articleCategoryId) {
      params = params.append('articleCategoryId', topicFilter.articleCategoryId);
    }

    return this.http.get(`${this.url}`, {
      params: params
    });

  }

}








