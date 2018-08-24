import { ArticleService } from './../../api/article.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleUtilsService } from './../../shared/article-utils.service';
import { Article } from '../../model/model';


@Component({
  selector: 'app-see-article',
  templateUrl: './see-article.component.html',
  styleUrls: ['./see-article.component.scss']
})
export class SeeArticleComponent implements OnInit {

  public article = new Article();
  public nowDate = new Date();
  public downloadingArticle;

  constructor(public articleUtilsService: ArticleUtilsService,
    public route: ActivatedRoute,
    public articleService: ArticleService) { }

  ngOnInit() {
    this.articleUtilsService.currentArticleUtils.subscribe(currentArticleUtils => {
      if (currentArticleUtils) {
        this.article = JSON.parse(currentArticleUtils);
      } else {
        this.articleService.findById(this.route.snapshot.params.id.toString()).subscribe(article => {
          this.article = article;
        });
      }
    });
  }

  public downloadArticle() {
    console.log('chamou');
    this.downloadingArticle = true;
    setTimeout(() => {
      this.downloadingArticle = false;
    }, 2000);
  }
}
