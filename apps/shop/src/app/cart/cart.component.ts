import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../basket.service';
import { BasketItem, Product } from './model/products.interface';

@Component({
  selector: 'ab-shop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  public products$: Observable<Product[]>;
  public basket: Array<BasketItem> = [];

  constructor(
    private http: HttpClient,
    private basketService: BasketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.products$ = this.http.get<Product[]>('./assets/data/products.json');
  }

  public onAddItem(item: BasketItem) {
    const itemIndex = this.getIndexofItem(item);
    if (itemIndex !== -1) {
      this.basket[itemIndex].units += item.units;
      this.basket = [...this.basket];
    } else {
      // this.basket.push(item);
      this.basket = [...this.basket, item];
    }
    this.onBasketChange();
    this.autoBackGroundRemover();
  }
  public onRemoveItem(item: BasketItem) {
    const itemIndex = this.getIndexofItem(item);
    if (itemIndex !== -1) {
      //this.basket.splice(itemIndex, 1);
      this.basket = this.basket.filter(i => i.product._id !== item.product._id);
    }
    this.onBasketChange();
  }
  private getIndexofItem(item: BasketItem) {
    return this.basket.findIndex(
      basketItem => basketItem.product._id === item.product._id
    );
  }

  private onBasketChange() {
    const totalUnits = this.basket.reduce(
      (total, item) => total + item.units,
      0
    );
    this.basketService.units$.next(totalUnits);
    this.basketService.basket$.next(this.basket);
  }
  private autoBackGroundRemover() {
    setTimeout(() => {
      this.onRemoveItem(this.basket[0]);
      this.cdr.detectChanges();
    }, 5000);
  }
}
