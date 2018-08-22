import { Article } from '../model/model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ArticleUtilsService {
  private articleUtilsBehavior = new BehaviorSubject('');

  currentArticleUtils = this.articleUtilsBehavior.asObservable();

  updateArticleUtils(item: Article) {
    this.articleUtilsBehavior.next(JSON.stringify(item));
  }
}
