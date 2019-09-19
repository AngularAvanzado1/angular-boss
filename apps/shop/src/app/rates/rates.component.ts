import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ExchangeRateActions from './store/exchange-rate/exchange-rate.actions';
import {
  exchangeRateFeatureKey,
  ExchangeState
} from './store/exchange-rate/exchange-rate.reducer';
@Component({
  selector: 'ab-shop-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {
  public rates$ = this.store.select(exchangeRateFeatureKey, 'rates');

  constructor(private store: Store<ExchangeState>) {}

  ngOnInit() {
    this.store.dispatch(ExchangeRateActions.loadExchangeRates());
  }
}
