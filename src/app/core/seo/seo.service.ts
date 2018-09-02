import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { PageSeoSetup } from './../../model/model';


@Injectable()
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  public generateSeo(metaTag: PageSeoSetup, route: ActivatedRoute): void {
    while (route) {
      if (route.children && route.children.length) {
        route = route.children[0];
      } else if (metaTag.title) {
        if (!metaTag.keywords) {
          metaTag.keywords = ['construção'];
        }
        if (!metaTag.description) {
          metaTag.description = 'construção';
        }
        const keywords = metaTag.keywords.toString();
        this.titleService.setTitle('' + metaTag.title);
        this.metaService.updateTag({ name: 'keywords', content: keywords });
        this.metaService.updateTag({
          name: 'description',
          content: metaTag.description
        });
        console.log('chegou aqui');
        return;
      } else {
        return;
      }
    }

  }

}
