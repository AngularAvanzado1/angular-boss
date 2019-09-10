import { Component } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'ab-shop-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  public title = 'shop';
  public basketUnits = 0;
  public basket = [];
  constructor(basketService: BasketService) {
    basketService.units$.subscribe({
      next: units => (this.basketUnits = units)
    });
    basketService.basket$.subscribe({
      next: basket => (this.basket = basket)
    });
  }
}
