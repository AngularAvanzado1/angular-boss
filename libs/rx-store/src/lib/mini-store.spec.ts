import { MiniStore } from './mini-store';

describe('GIVEN: a basic mini-store of  product stocks', () => {
  interface ProductStock {
    stock: number;
  }

  const initial: ProductStock = {
    stock: 25
  };
  describe('WHEN: I start one ', () => {
    const stockMiniStore = new MiniStore<ProductStock>(initial);
    it('THEN: it should have the inital value', done => {
      stockMiniStore.select$().subscribe(res => {
        expect(res).toEqual(initial);
        done();
      });
    });
  });
  describe('WHEN: I start and set a new value ', () => {
    const stockMiniStore = new MiniStore<ProductStock>(initial);
    stockMiniStore.set({ stock: 40 });
    it('THEN: it should emit the same value', done => {
      stockMiniStore.select$().subscribe(res => {
        expect(res).toEqual({ stock: 40 });
        done();
      });
    });
  });
});
