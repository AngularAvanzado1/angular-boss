import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketItem, Product, PRODUCTS } from './database/products.data';

@Component({
  selector: 'ab-shop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent implements OnInit {
  public products: Product[] = PRODUCTS;
  public basket: Array<BasketItem> = [];

  constructor(private basketService: BasketService) {}

  ngOnInit() {}

  public onAddItem(item: BasketItem) {
    this.basket.push(item);
    this.onBasketChange();
  }
  public onRemoveItem(item: BasketItem) {
    this.basket = this.basket.filter(i => i.product._id !== item.product._id);
    this.onBasketChange();
  }
  private onBasketChange() {
    const totalUnits = this.basket.reduce(
      (total, item) => total + item.units,
      0
    );
    this.basketService.units$.next(totalUnits);
    this.basketService.basket$.next(this.basket);
  }
}
