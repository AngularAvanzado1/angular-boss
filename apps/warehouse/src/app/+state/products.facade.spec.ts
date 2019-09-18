import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ProductsEntity } from './products.models';
import { ProductsEffects } from './products.effects';
import { ProductsFacade } from './products.facade';

import * as ProductsSelectors from './products.selectors';
import * as ProductsActions from './products.actions';
import {
  PRODUCTS_FEATURE_KEY,
  ProductsState,
  initialState,
  reducer
} from './products.reducer';

interface TestSchema {
  products: ProductsState;
}

describe('ProductsFacade', () => {
  let facade: ProductsFacade;
  let store: Store<TestSchema>;
  const createProductsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ProductsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PRODUCTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ProductsEffects])
        ],
        providers: [ProductsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ProductsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allProducts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allProducts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadProductsSuccess` to manually update list
     */
    it('allProducts$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allProducts$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          ProductsActions.loadProductsSuccess({
            products: [createProductsEntity('AAA'), createProductsEntity('BBB')]
          })
        );

        list = await readFirst(facade.allProducts$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
