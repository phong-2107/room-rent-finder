Cypress.Commands.add("loginAsUser", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input#taiKhoan').type('newuser');
    cy.get('input#password').type('12345679Khanh');
    cy.get('button[type="submit"]').click();
  });