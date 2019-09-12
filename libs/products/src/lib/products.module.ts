import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTemplateComponent } from './product-template/product-template.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductTemplateComponent],
  exports: [ProductTemplateComponent]
})
export class ProductsModule {}
