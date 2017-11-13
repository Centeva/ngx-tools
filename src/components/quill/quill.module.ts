import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { QuillComponent } from './quill.component';

@NgModule({
  declarations: [QuillComponent],
  imports: [BrowserModule],
  exports: [QuillComponent],
  providers: [],
})
export class QuillModule {}
