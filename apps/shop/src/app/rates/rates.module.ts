import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RatesRoutingModule } from './rates-routing.module';
import { RatesComponent } from './rates.component';
import { StoreModule } from '@ngrx/store';
import * as fromExchangeRate from './store/exchange-rate/exchange-rate.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExchangeRateEffects } from './store/exchange-rate/exchange-rate.effects';

const routes: Routes = [
  { path: '', component: RatesComponent }
];

@NgModule({
  declarations: [RatesComponent],
  imports: [
    CommonModule,
    RatesRoutingModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromExchangeRate.exchangeRateFeatureKey, fromExchangeRate.reducer),
    EffectsModule.forFeature([ExchangeRateEffects])
  ]
})
export class RatesModule { }
