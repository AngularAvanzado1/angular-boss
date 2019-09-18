import { Action, createReducer, on } from '@ngrx/store';
import * as PaymentMethodActions from './payment-method.actions';
import { RegisteredPaymentMethods } from './payment-method.model';

export const paymentMethodFeatureKey = 'paymentMethod';

export interface State {
  registeredPaymentMethods: RegisteredPaymentMethods;
}

export const initialState: State = {
  registeredPaymentMethods: { list: [], preferred: null }
};

const paymentMethodReducer = createReducer(
  initialState,

  on(PaymentMethodActions.loadPaymentMethods, state => state),
  on(PaymentMethodActions.addPaymentMethod, (state, { newPaymentMethod }) => {
    state.registeredPaymentMethods.list = [
      ...state.registeredPaymentMethods.list,
      newPaymentMethod
    ];
    return state;
  })
);

export function reducer(state: State | undefined, action: Action) {
  return paymentMethodReducer(state, action);
}
