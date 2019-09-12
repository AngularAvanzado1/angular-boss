import { Product } from '@a-boss/domain';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ab-shop-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {
  @Input() public product: Product;
  @Output() public buy = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
}
