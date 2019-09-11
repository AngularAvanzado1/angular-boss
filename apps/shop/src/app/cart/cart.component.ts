import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketItem, Product } from './model/products.interface';

@Component({
  selector: 'ab-shop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent implements OnInit {
  public products: Product[];
  public basket: Array<BasketItem> = [];

  constructor(private http: HttpClient, private basketService: BasketService) {}

  ngOnInit() {
    this.http.get<Product[]>('./assets/data/products.json').subscribe({
      next: response => {
        this.products = response;
        console.log({ products: this.products });
      }
    });
    // this.products = [
    //   {
    //     _id: 'MS-2',
    //     description: 'Surface',
    //     category: 'Computer',
    //     brand: 'Microsoft',
    //     price: 1500,
    //     stock: 20
    //   }
    // ];
  }

  public onAddItem(item: BasketItem) {
    const itemIndex = this.getIndexofItem(item);
    if (itemIndex !== -1) {
      this.basket[itemIndex].units += item.units;
    } else {
      this.basket.push(item);
    }
    this.onBasketChange();
    this.autoBackGroundRemover();
  }
  public onRemoveItem(item: BasketItem) {
    const itemIndex = this.getIndexofItem(item);
    if (itemIndex !== -1) {
      this.basket.splice(itemIndex, 1);
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
    }, 5000);
  }
}
