import { getGreeting } from '../support/app.po';

declare var cy;
declare var context;

describe('GIVEN: the shop web app', () => {
  beforeEach(() => cy.visit('/'));
  context('WHEN: user visits home page', () => {
    it('THEN: should display welcome message', () => {
      getGreeting().contains('Hello world');
    });

    it('THEN: should display welcome message from the API', () => {
      getGreeting().contains('and Welcome to api!');
    });
  });
});
