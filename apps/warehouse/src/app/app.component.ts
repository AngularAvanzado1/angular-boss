import { Component } from '@angular/core';

@Component({
  selector: 'ab-warehouse-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    `
  ]
})
export class AppComponent {
  title = 'warehouse';
}
