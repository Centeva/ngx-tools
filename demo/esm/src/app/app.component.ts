import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <marquee>Works!</marquee>
  `
})
export class AppComponent {
  public header: string = 'UMD Demo';
}
