import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import * as PaymentMethodActions from './payment-method.actions';
import { initialState } from './payment-method.reducer';

@Injectable()
export class PaymentMethodEffects {
  private storeKey = 'paymentMethodList';

  public loadPaymentMethods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentMethodActions.loadPaymentMethods),
      concatMap(() => {
        try {
          let storedList = JSON.parse(
            window.localStorage.getItem(this.storeKey)
          );
          if (!storedList) {
            storedList = initialState.paymentMethods.list;
            window.localStorage.setItem(
              this.storeKey,
              JSON.stringify(storedList)
            );
          }
          return of(
            PaymentMethodActions.loadPaymentMethodsSucess({
              paymentMethodList: storedList
            })
          );
        } catch (e) {
          return of(PaymentMethodActions.loadPaymentMethodsError);
        }
      })
    )
  );

  public addPaymentMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentMethodActions.addPaymentMethod),
      concatMap(action => {
        try {
          let storedList = JSON.parse(
            window.localStorage.getItem(this.storeKey)
          );
          storedList = [...storedList, action.newPaymentMethod];
          window.localStorage.setItem(
            this.storeKey,
            JSON.stringify(storedList)
          );
          return EMPTY;
        } catch (e) {
          return EMPTY;
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
