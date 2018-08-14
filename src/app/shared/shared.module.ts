import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from 'ngx-chips';

import { SelectModule } from 'ng-select';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    SelectModule,
    HttpClientModule,
    QuillModule,
    TagInputModule
  ],
  declarations: [],
  exports: [
    NgbModule,
    AngularFontAwesomeModule,
    NgbAccordion,
    SelectModule,
    HttpClientModule,
    QuillModule,
    TagInputModule
  ]
})
export class SharedModule { }
