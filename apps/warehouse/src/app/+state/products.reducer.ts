import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductsActions from './products.actions';
import { ProductsEntity } from './products.models';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState extends EntityState<ProductsEntity> {
  selectedId?: string | number; // which Products record has been selected
  loaded: boolean; // has the Products list been loaded
  error?: string | null; // last none error (if any)
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const productsAdapter: EntityAdapter<
  ProductsEntity
> = createEntityAdapter<ProductsEntity>();

export const initialState: ProductsState = productsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) =>
    productsAdapter.addAll(products, { ...state, loaded: true })
  ),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: ProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}
