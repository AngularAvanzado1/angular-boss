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
    const currentProduct = this.basket.find(
      basketItem => basketItem.product._id === item.product._id
    );
    if (currentProduct) {
      currentProduct.units += item.units;
    } else {
      this.basket.push(item);
    }
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
