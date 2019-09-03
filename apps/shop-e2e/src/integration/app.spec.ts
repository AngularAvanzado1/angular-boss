import { getGreeting } from '../support/app.po';

describe('shop', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to shop!');
  });
});
