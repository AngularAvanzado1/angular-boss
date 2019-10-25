import { ConverterComponent, CurrencyModule } from '@angular-boss/currency';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CurrencyModule],
  providers: [],
  bootstrap: [],
  entryComponents: [ConverterComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(ConverterComponent, { injector });
    customElements.define('angular-boss-currency-converter', el);
  }
}
