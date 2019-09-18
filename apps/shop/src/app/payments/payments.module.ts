import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { PaymentMethodEffects } from './store/payment-method/payment-method.effects';
import * as fromPaymentMethod from './store/payment-method/payment-method.reducer';

const routes: Routes = [{ path: '', component: PaymentsComponent }];

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      fromPaymentMethod.paymentMethodFeatureKey,
      fromPaymentMethod.reducer
    ),
    EffectsModule.forFeature([PaymentMethodEffects])
  ]
})
export class PaymentsModule {}
