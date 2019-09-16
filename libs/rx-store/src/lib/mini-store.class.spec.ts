import { MiniStore } from './mini-store.class';

describe('GIVEN: a basic mini-store of a thermometer', () => {
  const initial = {
    temperature: 0
  };
  describe('WHEN: I start one ', () => {
    const thermMiniStore = new MiniStore<{ temperature: number }>(initial);
    it('THEN: it should have the inital value', done => {
      thermMiniStore.Select$().subscribe(res => {
        expect(res).toEqual(initial);
        done();
      });
    });
  });
  describe('WHEN: I start and set a new value ', () => {
    const thermMiniStore = new MiniStore<{ temperature: number }>(initial);
    thermMiniStore.Set({ temperature: 1000 });
    it('THEN: it should emit the same value', done => {
      thermMiniStore.Select$().subscribe(res => {
        expect(res).toEqual({ temperature: 1000 });
        done();
      });
    });
  });
});
