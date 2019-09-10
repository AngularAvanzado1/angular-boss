import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasketItem, Product } from '../database/products.data';

@Component({
  selector: 'ab-shop-item-picker',
  templateUrl: './item-picker.component.html',
  styles: []
})
export class ItemPickerComponent implements OnInit {
  @Input() public products: Product[];
  @Output() public addItem = new EventEmitter<BasketItem>();
  public pickerFormGroup: FormGroup;
  constructor() {}

  ngOnInit() {
    this.pickerFormGroup = new FormGroup({
      product: new FormControl(this.products[0]),
      units: new FormControl(0, [Validators.min(1)])
    });
  }
}
