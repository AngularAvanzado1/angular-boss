import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paymentMethodFeatureKey, PaymentMethodsState } from './payment-method.reducer';

export const getPaymentMethodState = createFeatureSelector<PaymentMethodsState>(
  paymentMethodFeatureKey
);

export const getPaymentMethodsList = createSelector(
  getPaymentMethodState,
  (state: PaymentMethodsState) => state.paymentMethods.list
);

export const getPreferredPaymentMethod = createSelector(
  getPaymentMethodState,
  (state: PaymentMethodsState) => state.paymentMethods.preferred
);
