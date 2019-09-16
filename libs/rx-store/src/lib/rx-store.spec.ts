import { Action, reducerFunction, RxStore } from './rx-store';

describe('GIVEN: a basic mini-store of a thermometer', () => {
  interface ThermoMetric {
    temperature: number;
  }

  const initial: ThermoMetric = {
    temperature: 25
  };

  const thermoReducer: reducerFunction<ThermoMetric> = function(
    state: ThermoMetric,
    action: Action
  ): ThermoMetric {
    const clonedState = { ...state };
    switch (action.type) {
      case 'set':
        clonedState.temperature = action.payload;
        break;
      case 'increment':
        clonedState.temperature += action.payload;
        break;
      default:
        break;
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
    const metricAction: Action = { type: 'set', payload: 40 };
    thermoRxMiniStore.dispatch(metricAction);
    it('THEN: it should emit the same value', done => {
      thermoRxMiniStore.select$().subscribe(res => {
        expect(res).toEqual({ temperature: 40 });
        done();
      });
    });
  });
  describe('WHEN: I get an increment ', () => {
    const thermoRxMiniStore = new RxStore<ThermoMetric>(initial, thermoReducer);
    const metricAction: Action = { type: 'increment', payload: 5 };
    thermoRxMiniStore.dispatch(metricAction);
    it('THEN: it should raise the temperature', done => {
      thermoRxMiniStore.select$().subscribe(res => {
        expect(res).toEqual({ temperature: 30 });
        done();
      });
    });
  });
});
