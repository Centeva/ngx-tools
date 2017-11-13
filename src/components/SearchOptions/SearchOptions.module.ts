import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SearchOptionsComponent } from './SearchOptions.component';

import { NgPipesModule } from 'angular-pipes';

@NgModule({
  declarations: [SearchOptionsComponent],
  exports: [SearchOptionsComponent],
  imports: [NgPipesModule, BrowserModule, FormsModule],
})
export class SearchOptionsModule {}
