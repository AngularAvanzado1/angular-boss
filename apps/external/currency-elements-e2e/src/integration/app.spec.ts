import { getGreeting } from '../support/app.po';

describe('external-currency-elements', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to external-currency-elements!');
  });
});
