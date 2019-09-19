import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PaymentMethodActions from './payment-method.actions';
import { PaymentMethod, PaymentMethods } from './payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(private store: Store<PaymentMethods>) {}

  public loadPaymentMethods() {
    this.store.dispatch(PaymentMethodActions.loadPaymentMethods());
  }
  public addPaymentMethod(newPaymentMethod: PaymentMethod) {
    this.store.dispatch(
      PaymentMethodActions.addPaymentMethod({
        newPaymentMethod: { ...newPaymentMethod }
      })
    );
  }
  public selectPreferredPaymentMethod(preferredId: string) {
    this.store.dispatch(
      PaymentMethodActions.selectPreferredPaymentMethod({ preferredId })
    );
  }
  public setExpirationPaymentMethod(updatedPaymentMethod: PaymentMethod) {
    this.store.dispatch(
      PaymentMethodActions.setExpirationPaymentMethod({
        updatedPaymentMethod: { ...updatedPaymentMethod }
      })
    );
  }
}
