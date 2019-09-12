import { ProductsModule } from '@a-boss/products';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [{ path: '', component: CatalogComponent }];

@NgModule({
  declarations: [CatalogComponent, ProductComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    RouterModule.forChild(routes),
    ProductsModule
  ]
})
export class CatalogModule {}
