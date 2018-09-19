describe('Login and logout action testing', () => {
  before(() => {
    cy.visit('localhost:3000');
  });

  it('login', () => {
    cy.login();
  }); 
});