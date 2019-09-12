import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTemplateComponent } from './product-template/product-template.component';
import { OutOfStockDirective } from './out-of-stock.directive';
import { ExRatePipe } from './ex-rate.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductTemplateComponent, OutOfStockDirective, ExRatePipe],
  exports: [ProductTemplateComponent, OutOfStockDirective, ExRatePipe]
})
export class ProductsModule {}
