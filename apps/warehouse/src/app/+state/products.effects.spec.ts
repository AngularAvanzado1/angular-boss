import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ProductsEffects } from './products.effects';
import * as ProductsActions from './products.actions';

describe('ProductsEffects', () => {
  let actions: Observable<any>;
  let effects: ProductsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ProductsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(ProductsEffects);
  });

  describe('loadProducts$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProductsActions.loadProducts() });

      const expected = hot('-a-|', {
        a: ProductsActions.loadProductsSuccess({ products: [] })
      });

      expect(effects.loadProducts$).toBeObservable(expected);
    });
  });
});
