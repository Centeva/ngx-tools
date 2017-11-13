import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { ToolsModule } from '../../lib/tools.module';

@NgModule({
  imports: [ BrowserModule, ToolsModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
