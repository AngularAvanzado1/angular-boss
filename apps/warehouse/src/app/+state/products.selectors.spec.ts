import { ProductsEntity } from './products.models';
import {
  ProductsState,
  productsAdapter,
  initialState
} from './products.reducer';
import * as ProductsSelectors from './products.selectors';

describe('Products Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProductsId = it => it['id'];
  const createProductsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ProductsEntity);

  let state;

  beforeEach(() => {
    state = {
      products: productsAdapter.addAll(
        [
          createProductsEntity('PRODUCT-AAA'),
          createProductsEntity('PRODUCT-BBB'),
          createProductsEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Products Selectors', () => {
    it('getAllProducts() should return the list of Products', () => {
      const results = ProductsSelectors.getAllProducts(state);
      const selId = getProductsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ProductsSelectors.getSelected(state);
      const selId = getProductsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getProductsLoaded() should return the current 'loaded' status", () => {
      const result = ProductsSelectors.getProductsLoaded(state);

      expect(result).toBe(true);
    });

    it("getProductsError() should return the current 'error' state", () => {
      const result = ProductsSelectors.getProductsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
