
Cypress.Commands.add('deleteInitiative', (name) => { 
    cy.request(`http://localhost:5000/api/initiative/${name}`)
      .then(response => {
        cy.request('DELETE', `http://localhost:5000/api/initiative/${response.body._id}`);
     });
});

Cypress.Commands.add('login', () => {
    cy.get('[data-cy="my-account-button"]').click();
    cy.get('button:contains("Zaloguj się przez Google")').click();
});