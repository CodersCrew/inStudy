describe('Login action testing', () => {
  before(() => {
    cy.visit('localhost:3000');
  });

  it('logout', () => {
    // cy.get('img.styles__UserImage-ddmQFy.etZGSp').click();
    // cy.get('div.styles__Item-gfQzcN.lpiuQi:contains("Wyloguj się")').click();
    // cy.get('button.ant-btn.styles__StyledButton-fPIFiv > span').should('contain', 'Moje konto');

  });

  it('login', () => {
     cy.get('button.ant-btn:contains("Moje konto")').click();
     cy.get('button.ant-btn:contains("Zaloguj się przez Google")').click();
    //  cy.request({
    //    method: 'GET',
    //    url: '/auth/google',
    //    body:{
    //    }
    //  });
  });
});
