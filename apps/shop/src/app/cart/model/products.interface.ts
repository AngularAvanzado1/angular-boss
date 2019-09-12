import { Product } from '@a-boss/domain';

export interface IBasketItem {
  product: Product;
  units: number;
}
export class BasketItem implements IBasketItem {
  product: Product;
  private _units: number;
  get units() {
    console.count('get UNITS calls');
    return this._units;
  }
  set units(value) {
    this._units = value;
  }
}
