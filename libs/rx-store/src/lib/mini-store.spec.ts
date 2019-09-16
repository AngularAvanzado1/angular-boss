import { MiniStore } from './mini-store';

describe('GIVEN: a basic mini-store of a thermometer', () => {
  interface ThermoMetric {
    temperature: number;
  }
  const initial: ThermoMetric = {
    temperature: 0
  };
  describe('WHEN: I start one ', () => {
    const thermoMiniStore = new MiniStore<ThermoMetric>(initial);
    it('THEN: it should have the inital value', done => {
      thermoMiniStore.select$().subscribe(res => {
        expect(res).toEqual(initial);
        done();
      });
    });
  });
  describe('WHEN: I start and set a new value ', () => {
    const thermoMiniStore = new MiniStore<ThermoMetric>(initial);
    thermoMiniStore.set({ temperature: 1000 });
    it('THEN: it should emit the same value', done => {
      thermoMiniStore.select$().subscribe(res => {
        expect(res).toEqual({ temperature: 1000 });
        done();
      });
    });
  });
});
