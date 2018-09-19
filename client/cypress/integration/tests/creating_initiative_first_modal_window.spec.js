describe('Create an initiative - first modal window', () => {
  before(() => {
    cy.visit('localhost:3000');
  });

  it('login', () => {
    cy.get('button.ant-btn:contains("Moje konto")').click();
    cy.get('button.ant-btn:contains("Zaloguj się przez Google")').click();
  }); 

  it('user profile', () => {
    cy.get('div>a[href="/student/profil/inicjatywy"]').click();
    cy.get('button.ant-btn:nth-of-type(2)').click();
  });
});