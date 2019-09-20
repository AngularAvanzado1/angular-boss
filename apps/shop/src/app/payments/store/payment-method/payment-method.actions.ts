import { createAction, props } from '@ngrx/store';
import { PaymentMethod } from './payment-method.model';

export const loadPaymentMethods = createAction(
  '[PaymentMethod] Load Payment Methods'
);
export const loadPaymentMethodsSucess = createAction(
  '[PaymentMethod] Load Payment Methods Success',
  props<{ paymentMethodList: PaymentMethod[] }>()
);
export const loadPaymentMethodsError = createAction(
  '[PaymentMethod] Load Payment Methods Error'
);

export const addPaymentMethod = createAction(
  '[PaymentMethod] Add PaymentMethod',
  props<{ newPaymentMethod: PaymentMethod }>()
);

export const selectPreferredPaymentMethod = createAction(
  '[PaymentMethod] Select Preferred PaymentMethod',
  props<{ preferredId: string }>()
);

export const setExpirationPaymentMethod = createAction(
  '[PaymentMethod] Set Expiration Date on PaymentMethod',
  props<{ updatedPaymentMethod: PaymentMethod }>()
);
