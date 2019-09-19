import { createAction, props } from '@ngrx/store';

export const loadExchangeRates = createAction(
  '[ExchangeRate] Load ExchangeRates'
);

export const loadExchangeRatesSuccess = createAction(
  '[ExchangeRate] Load ExchangeRates Success',
  props<{ rates: any }>()
);

export const loadExchangeRatesError = createAction(
  '[ExchangeRate] Load ExchangeRates Error',
  props<{ rates: any }>()
);
