import { NgModule } from '@angular/core';
import {
  CheckListModule,
  QuillModule,
  SearchOptionsModule,
  ToggleSliderModule
} from './components/index';

@NgModule({
  imports: [CheckListModule, QuillModule, SearchOptionsModule, ToggleSliderModule],
  exports: [CheckListModule, QuillModule, SearchOptionsModule, ToggleSliderModule]
})
export class ToolsModule { }
