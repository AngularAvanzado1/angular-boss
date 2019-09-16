import { Action, reducerFunction, RxStore } from './rx-store';

describe('GIVEN: a basic mini-store of a thermometer', () => {
  interface ThermoMetric {
    temperature: number;
  }

  const initial: ThermoMetric = {
    temperature: 0
  };

  const thermoReducer: reducerFunction<ThermoMetric> = function(
    state: ThermoMetric,
    action: Action
  ): ThermoMetric {
    const clonedState = { ...state };
    if (action.type === 'set') {
      clonedState.temperature = action.payload;
    }
    return clonedState;
  };

  describe('WHEN: I start one ', () => {
    const thermoRxStore = new RxStore<ThermoMetric>(initial, thermoReducer);
    it('THEN: it should have the inital value', done => {
      thermoRxStore.select$().subscribe(res => {
        expect(res).toEqual(initial);
        done();
      });
    });
  });
  describe('WHEN: I start and set a new value ', () => {
    const thermoRxMiniStore = new RxStore<ThermoMetric>(initial, thermoReducer);
    const metricAction: Action = { type: 'set', payload: 1000 };
    thermoRxMiniStore.dispatch(metricAction);
    it('THEN: it should emit the same value', done => {
      thermoRxMiniStore.select$().subscribe(res => {
        expect(res).toEqual({ temperature: 1000 });
        done();
      });
    });
  });
});
