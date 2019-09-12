import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[abProductsOutOfStock]'
})
export class OutOfStockDirective {
  private minimalStock = 10;

  @Input()
  set abProductsOutOfStock(stock: number) {
    const color = stock <= this.minimalStock ? 'MistyRose' : 'Aquamarine';
    this.el.nativeElement.style.backgroundColor = color;
  }

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = 'blue';
  }
}
