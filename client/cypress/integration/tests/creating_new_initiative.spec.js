describe('Create an new initiative', () => {
    const text = 'Jesteśmy jedną z największych inicjatyw związanych z programowaniem na terenie Wrocławia. Działamy aktywnie :)';
    const name = "CodersCrew";

    before(() => {
      cy.visit('localhost:3000');
    });
  
    it('login', () => {
      cy.login();
    }); 
  
    it('go to initiatives section', () => {
      cy.get('div>a[href="/student/profil/inicjatywy"]').click();
    });

    it('creating new initiative', () => {
      cy.get('button:nth-of-type(2)').click();
      cy.get('button[label="Rozpocznij dodawanie"]').click();
      cy.get('button[label="Stwórz nową inicjatywę"]').click();
    });

    it('typing name', () => {
      cy.get('input[name="name"]').type(name).should('have.value', name);
    });

    it('typing emial', () => {
      cy.get('input[name="email"]').type('coderscrew@gmail.com').should('have.value', 'coderscrew@gmail.com');
    });

    it('selecting city', () => {
      cy.get('div[role="combobox"]').first().click().get('li:contains("Wrocław")').click();
    });

    it('selecting activity', () => {
      cy.get('div[role="combobox"]').last().click().get('li:contains("Techniczne, IT")').click();
    });

    it('typing facebook url', () => {
      cy.get('input[name="facebookUrl"]').type('CodersCrew').should('have.value', 'CodersCrew');
    });

    it('typing description', () => {
      cy.get('textarea[name="description"]').type(text).should('have.value', text);
    });
  
    it('submiting the form', () => {
      cy.server();
      cy.route({
        method: 'POST', 
        url: '/api/initiative'
      }).as('put_Initiative');
      cy.get('button[label="Utwórz konto"]').click();
      cy.wait('@put_Initiative');
    });

    it('deleting an initiative', () => {
      cy.deleteInitiative(name);
    });

  });