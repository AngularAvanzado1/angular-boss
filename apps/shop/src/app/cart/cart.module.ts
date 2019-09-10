import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BasketListComponent } from './basket-list/basket-list.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { ItemPickerComponent } from './item-picker/item-picker.component';

const routes: Routes = [{ path: '', component: CartComponent }];

@NgModule({
  declarations: [CartComponent, ItemPickerComponent, BasketListComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class CartModule {}
