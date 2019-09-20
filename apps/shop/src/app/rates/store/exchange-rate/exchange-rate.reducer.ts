import { Action, createReducer, on } from '@ngrx/store';
import * as ExchangeRateActions from './exchange-rate.actions';

export interface ExchangeState {
  rates: any;
}
export const initialState: ExchangeState = {
  rates: {}
};

export const exchangeRateFeatureKey = 'exchangeRate';

const exchangeRateReducer = createReducer(
  initialState,

  on(ExchangeRateActions.loadExchangeRates, state => state),
  on(ExchangeRateActions.loadExchangeRatesSuccess, (state, payload) => ({
    ...state,
    rates: payload.rates
  })),
  on(ExchangeRateActions.loadExchangeRatesError, (state, payload) => ({
    ...state,
    rates: payload.rates
  }))
);

export function reducer(state: ExchangeState | undefined, action: Action) {
  return exchangeRateReducer(state, action);
}
