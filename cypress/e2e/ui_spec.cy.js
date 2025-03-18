describe("ui autotests", () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })

  it('should display all elements correctly', () => {
    cy.get('.calculator').should('be.visible');
    cy.get('.calculator__displays').should('be.visible');
    cy.get('.calculator__main-display').should('be.visible');
    cy.get('.calculator__second-display').should('be.visible');
    cy.get('.calculator__buttons').should('be.visible');
    cy.get('.calculator__btn').should('be.visible')
    cy.get('.calculator__btn').should('have.length', 19)
    cy.get('.fa-solid').should('be.visible')
    cy.get('.fa-solid').should('have.length', 7)
  })
})