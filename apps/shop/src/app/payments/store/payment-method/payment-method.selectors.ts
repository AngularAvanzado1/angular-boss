import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paymentMethodFeatureKey, State } from './payment-method.reducer';

export const getPaymentMethodState = createFeatureSelector<State>(
  paymentMethodFeatureKey
);

export const getPaymentMethodsList = createSelector(
  getPaymentMethodState,
  (state: State) => state.paymentMethods.list
);

export const getPreferredPaymentMethod = createSelector(
  getPaymentMethodState,
  (state: State) => state.paymentMethods.preferred
);
