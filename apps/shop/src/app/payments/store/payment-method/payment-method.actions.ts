import { createAction, props } from '@ngrx/store';
import { PaymentMethod } from './payment-method.model';

export const loadPaymentMethods = createAction(
  '[PaymentMethod] Load Payment Methods'
);

export const addPaymentMethod = createAction(
  '[PaymentMethod] Add Payment Method',
  props<{ newPaymentMethod: PaymentMethod }>()
);

export const selectPreferredPaymentMethod = createAction(
  '[PaymentMethod] Select preferred Payment Method',
  props<{ preferredId: string }>()
);

export const setExpirationPaymentMethod = createAction(
  '[PaymentMethod] Set expiration date on Payment Method',
  props<{ updatedPaymentMethod: PaymentMethod }>()
);
