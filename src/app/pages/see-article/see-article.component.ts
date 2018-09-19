import { Keyword } from './../../model/model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { ArticleUtilsService } from './../../shared/article-utils.service';
import { Article, PageSeoSetup } from '../../model/model';
import { ArticleService } from './../../api/article.service';
import { SeoService } from '../../core/seo/seo.service';


@Component({
  selector: 'app-see-article',
  templateUrl: './see-article.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./see-article.component.scss']
})
export class SeeArticleComponent implements OnInit {

  @ViewChild('buttonDownload') buttonDownload: ElementRef;

  public article = new Article();
  public nowDate = new Date();

  public tags = new PageSeoSetup;

  constructor(public articleUtilsService: ArticleUtilsService,
    public route: ActivatedRoute,
    public articleService: ArticleService,
    public seoService: SeoService,
    public router: Router) {

    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.articleUtilsService.currentArticleUtils.subscribe(currentArticleUtils => {
          if (currentArticleUtils) {
            this.article = JSON.parse(currentArticleUtils);
            this.tags.title = this.article.title;
            this.tags.keywords = this.article.meta && this.article.meta.keywords ? this.article.meta.Keywords : [];
            this.tags.description = this.article.seoMetaDescription;
            this.seoService.generateSeo(this.tags, this.route);
          } else {
            this.articleService.findById(this.route.snapshot.params.id.toString()).subscribe(article => {
              this.article = article;
              this.tags.title = this.article.title;
              this.tags.keywords = this.article.meta && this.article.meta.keywords ? this.article.meta.Keywords : [];
              this.tags.description = this.article.seoMetaDescription;
              this.seoService.generateSeo(this.tags, this.route);
            });
          }
        });
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      const el: HTMLElement = this.buttonDownload.nativeElement as HTMLElement;
      el.click();
    }, 4000);
  }
}
