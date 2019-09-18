import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { ProductsPartialState } from './products.reducer';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.dataPersistence.fetch(ProductsActions.loadProducts, {
      run: (
        action: ReturnType<typeof ProductsActions.loadProducts>,
        state: ProductsPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return ProductsActions.loadProductsSuccess({ products: [] });
      },

      onError: (
        action: ReturnType<typeof ProductsActions.loadProducts>,
        error
      ) => {
        console.error('Error', error);
        return ProductsActions.loadProductsFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProductsPartialState>
  ) {}
}
