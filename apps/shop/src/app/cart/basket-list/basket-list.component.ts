import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BasketItem } from '../model/products.interface';

@Component({
  selector: 'ab-shop-basket-list',
  templateUrl: './basket-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketListComponent implements OnInit {
  @Input() public basket: Array<BasketItem> = [];
  @Output() public removeItem = new EventEmitter<BasketItem>();
  constructor() {}

  ngOnInit() {}

  public getAmount(item: BasketItem) {
    console.count('get AMOUNT calls');
    return item.units * item.product.price;
  }
}
