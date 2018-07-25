import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { SelectModule } from 'ng-select';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    SelectModule
  ],
  declarations: [],
  exports: [NgbModule, AngularFontAwesomeModule, NgbAccordion, SelectModule]
})
export class SharedModule { }
