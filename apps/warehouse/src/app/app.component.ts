import { Component } from '@angular/core';
import { environment } from '../environments/environment';

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
  public title = 'warehouse';
  public building = {
    date: Date.now(),
    value: 2345.897,
    status: 'buy'
  };
  constructor() {
    if (this.building.status === 'buy') {
      this.building.status = environment.buy;
    } else {
      this.building.status = environment.sell;
    }
  }
}
