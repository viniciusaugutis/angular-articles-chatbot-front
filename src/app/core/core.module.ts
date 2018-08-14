import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ArticleUtilsService } from './../shared/article-utils.service';
import { QuestionService } from '../api/question.service';
import { ArticleCategoryService } from '../api/article-category.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  declarations: [],
  providers: [
    ArticleCategoryService,
    QuestionService,
    ArticleUtilsService
  ]
})
export class CoreModule { }
