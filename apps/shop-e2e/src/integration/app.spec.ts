import { getGreeting, visitHome } from '../support/app.po';
describe('GIVEN: the shop web app', () => {
  beforeEach(() => visitHome());
  context('WHEN: user visits home page', () => {
    it('THEN: should display welcome message', () => {
      getGreeting().contains('Hello world');
    });
  });
});
