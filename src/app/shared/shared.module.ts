import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { QuillModule } from 'ngx-quill';

import { SelectModule } from 'ng-select';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    SelectModule,
    HttpClientModule,
    QuillModule
  ],
  declarations: [],
  exports: [
    NgbModule,
    AngularFontAwesomeModule,
    NgbAccordion,
    SelectModule,
    HttpClientModule,
    QuillModule
  ]
})
export class SharedModule { }
