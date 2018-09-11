
describe('Create an initiative - empty form', () => {
    before(() => {
      cy.visit('localhost:3000');
    });
  
    it('login', () => {
      cy.get('button.ant-btn:contains("Moje konto")').click();
      cy.get('button.ant-btn:contains("Zaloguj się przez Google")').click();
    }); 
  
    it('creating new initiative', () => {
      cy.get('div>a[href="/student/profil/inicjatywy"]').click();
      cy.get('button.ant-btn:nth-of-type(2)').click();
      cy.get('button[label="Rozpocznij dodawanie"]').click();
      cy.get('button[label="Stwórz nową inicjatywę"]').click();
    });

    it('completing the form', () => {
      cy.get('button[label="Utwórz konto"]').click();
    })
  });