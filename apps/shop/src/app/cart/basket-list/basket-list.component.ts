import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketItem } from '../database/products.data';

@Component({
  selector: 'ab-shop-basket-list',
  templateUrl: './basket-list.component.html',
  styles: []
})
export class BasketListComponent implements OnInit {
  @Input() public basket: Array<BasketItem> = [];
  @Output() public removeItem = new EventEmitter<BasketItem>();
  constructor() {}

  ngOnInit() {}

  public getAmount(item: BasketItem) {
    console.count('getAmount calls');
    return item.units * item.product.price;
  }
}
