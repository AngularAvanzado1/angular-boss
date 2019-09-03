import { getGreeting } from '../support/app.po';

describe('warehouse', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to warehouse!');
  });
});
