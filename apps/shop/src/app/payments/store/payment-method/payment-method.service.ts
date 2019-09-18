import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PaymentMethodActions from './payment-method.actions';
import {
  PaymentMethod,
  RegisteredPaymentMethods
} from './payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(private store: Store<RegisteredPaymentMethods>) {}
  public loadPaymentMethods() {
    this.store.dispatch(PaymentMethodActions.loadPaymentMethods());
  }
  public addPaymentMethod(paymentMethod: PaymentMethod) {
    this.store.dispatch(
      PaymentMethodActions.addPaymentMethod({ newPaymentMethod: paymentMethod })
    );
  }
  public selectPreferredPaymentMethod(preferredId: string) {
    this.store.dispatch(
      PaymentMethodActions.selectPreferredPaymentMethod({ preferredId })
    );
  }
  public setExpirationPaymentMethod(paymentMethod: PaymentMethod) {
    this.store.dispatch(
      PaymentMethodActions.setExpirationPaymentMethod({
        updatedPaymentMethod: paymentMethod
      })
    );
  }
}
