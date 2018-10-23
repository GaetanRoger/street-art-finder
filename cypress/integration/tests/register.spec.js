describe('Register', () => {
  it('land on home page', () => {
    cy.visit('localhost:4200');

    cy.get('button[color="primary"].mat-raised-button').click();

    cy.get('input[type=email]').type("cypress@cypress.com");
    cy.get('input[type=password]').type("cypresspassword");

    cy.get('button[color="primary"].mat-raised-button').click();
  });
});