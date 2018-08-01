import { QuestionService } from './../api/question.service';
import { QuestionCategoryService } from './../api/question-category.service';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  declarations: [],
  providers: [
    QuestionCategoryService,
    QuestionService
  ]
})
export class CoreModule { }
