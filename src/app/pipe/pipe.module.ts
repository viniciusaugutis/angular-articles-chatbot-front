import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlPipe } from './html.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeHtmlPipe
  ],
  exports: [
    SafeHtmlPipe
  ]
})
export class PipeModule { }
