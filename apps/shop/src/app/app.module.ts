import { UiModule } from '@a-boss/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) }], { initialNavigation: 'enabled' }),
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
