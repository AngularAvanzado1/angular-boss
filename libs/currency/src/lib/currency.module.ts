import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { ConverterComponent } from './converter/converter.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ConverterComponent],
  exports: [ConverterComponent],
  entryComponents: [ConverterComponent]
})
export class CurrencyModule {
  constructor(injector: Injector) {
    const el = createCustomElement(ConverterComponent, { injector });
    customElements.define('angular-boss-currency-converter', el);
  }
}
