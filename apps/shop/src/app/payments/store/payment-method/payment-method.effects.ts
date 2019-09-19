import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as PaymentMethodActions from './payment-method.actions';


@Injectable()
export class PaymentMethodEffects {


  loadPaymentMethods$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentMethodActions.loadPaymentMethods),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  ));


  constructor(private actions$: Actions) {}

}
