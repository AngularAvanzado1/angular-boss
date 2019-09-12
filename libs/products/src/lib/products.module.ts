import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTemplateComponent } from './product-template/product-template.component';
import { OutOfStockDirective } from './out-of-stock.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductTemplateComponent, OutOfStockDirective],
  exports: [ProductTemplateComponent, OutOfStockDirective]
})
export class ProductsModule {}
