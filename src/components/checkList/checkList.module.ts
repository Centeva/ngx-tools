import { NgModule } from '@angular/core';
import { CheckListComponent } from './checkList.component';
import { MatCheckboxModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CheckListComponent],
  exports: [CheckListComponent],
  imports: [MatCheckboxModule, BrowserModule],
})
export class CheckListModule {}
