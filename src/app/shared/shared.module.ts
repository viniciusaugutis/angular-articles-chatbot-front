import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  declarations: [],
  exports: [NgbModule, AngularFontAwesomeModule, NgbAccordion]
})
export class SharedModule { }
