import { Action, reducer, RxStore } from './rx-store';

describe('GIVEN: a basic mini-store of a thermometer', () => {
  const initial = {
    temperature: 0
  };

  const reductor: reducer = function(
    state: { temperature: number },
    action: Action
  ): { temperature: number } {
    state.temperature = action.payload;
    return state;
  };
  describe('WHEN: I start one ', () => {
    const thermMiniStore = new RxStore<{ temperature: number }>(
      initial,
      reductor
    );
    it('THEN: it should have the inital value', done => {
      thermMiniStore.select$().subscribe(res => {
        expect(res).toEqual(initial);
        done();
      });
    });
  });
  describe('WHEN: I start and set a new value ', () => {
    const thermMiniStore = new RxStore<{ temperature: number }>(
      initial,
      reductor
    );
    thermMiniStore.dispatch({ type: 'set', payload: 1000 });
    it('THEN: it should emit the same value', done => {
      thermMiniStore.select$().subscribe(res => {
        expect(res).toEqual({ temperature: 1000 });
        done();
      });
    });
  });
});
