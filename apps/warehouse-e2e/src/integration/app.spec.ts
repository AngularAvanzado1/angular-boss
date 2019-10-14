import { getGreeting } from '../support/app.po';
declare var cy;
declare var context;
describe('warehouse', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to warehouse!');
  });
});
