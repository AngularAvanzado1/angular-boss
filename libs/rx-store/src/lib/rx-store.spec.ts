import { Action, reducerFunction, RxStore } from './rx-store';

describe('GIVEN: a rx-store of product stocks', () => {
  interface ProductStock {
    stock: number;
  }

  const initial: ProductStock = {
    stock: 25
  };

  const stockReducer: reducerFunction<ProductStock> = function(
    state: ProductStock,
    action: Action
  ): ProductStock {
    const clonedState = { ...state };
    switch (action.type) {
      case 'set':
        clonedState.stock = action.payload;
        break;
      case 'increment':
        clonedState.stock += action.payload;
        break;
      default:
        break;
    }
    return clonedState;
  };

  describe('WHEN: I start one ', () => {
    const stockRxStore = new RxStore<ProductStock>(initial, stockReducer);
    it('THEN: it should have the inital value', done => {
      stockRxStore.select$().subscribe(res => {
        expect(res).toEqual(initial);
        done();
      });
    });
  });
  describe('WHEN: I start and set a new value ', () => {
    const stockRxStore = new RxStore<ProductStock>(initial, stockReducer);
    const metricAction: Action = { type: 'set', payload: 40 };
    stockRxStore.dispatch(metricAction);
    it('THEN: it should emit the same value', done => {
      stockRxStore.select$().subscribe(res => {
        expect(res).toEqual({ stock: 40 });
        done();
      });
    });
  });
  describe('WHEN: I get an increment ', () => {
    const stockRxStore = new RxStore<ProductStock>(initial, stockReducer);
    const incrementAction: Action = { type: 'increment', payload: 5 };
    stockRxStore.dispatch(incrementAction);
    it('THEN: it should raise the stock', done => {
      stockRxStore.select$().subscribe(res => {
        expect(res).toEqual({ stock: 30 });
        done();
      });
    });
  });
});
