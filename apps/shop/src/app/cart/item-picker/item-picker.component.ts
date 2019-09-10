import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasketItem, Product } from '../model/products.interface';

@Component({
  selector: 'ab-shop-item-picker',
  templateUrl: './item-picker.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ItemPickerComponent implements OnInit {
  @Input() public products: Product[];
  @Output() public addItem = new EventEmitter<BasketItem>();
  public pickerFormGroup: FormGroup;
  private configuration = {
    timeoutBackground: 0 * 1000,
    useCDR: false
  };
  constructor() {}

  ngOnInit() {
    this.pickerFormGroup = new FormGroup({
      product: new FormControl(this.products[0]),
      units: new FormControl(0, [Validators.min(1)])
    });
    if (this.configuration.timeoutBackground > 0) {
      this.autoBackGroundPicker();
    }
  }

  public onAddItem() {
    const basketItem = new BasketItem();
    basketItem.product = this.pickerFormGroup.value.product;
    basketItem.units = this.pickerFormGroup.value.units;
    this.addItem.next(basketItem);
  }

  private autoBackGroundPicker() {
    setInterval(() => {
      const randomItem = Math.round(Math.random() * this.products.length);
      const randomUnits = Math.round(Math.random() * 5) + 1;
      const item = { product: this.products[randomItem], units: randomUnits };
      console.log(`Auto pick item ${JSON.stringify(item)} `);
      this.pickerFormGroup.setValue(item);
      this.onAddItem();
      if (this.configuration.useCDR) {
        //  this.cdr.detectChanges();
      }
    }, this.configuration.timeoutBackground);
  }
}
