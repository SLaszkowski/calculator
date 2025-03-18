const clickButtons = (...buttonsSet) => {
  cy.log(buttonsSet)
  buttonsSet.forEach(button => cy.get(`[data-value="${button}"]`).click());
}

const secondDisplay = '.calculator__second-display';
const mainDisplay = '.calculator__main-display';

const testCases = [
  {
    buttons: ["4", "+", "9", "equal"],
    expectedEquation: "4 + 9 =",
    expectedResult: "13"
  },
  {
    buttons: ["3", ".", "6", "6", "+", "9", ".", "1", "1", "equal"],
    expectedEquation: "3.66 + 9.11 =",
    expectedResult: "12.77"
  }
]

describe("calculator autotests", () => {
  before(() => cy.visit('http://127.0.0.1:5500/index.html'))

  describe('basic operations', () => {

    it('should perform operations', () => {
      testCases.forEach(({buttons, expectedEquation, expectedResult}) => {
        clickButtons(...buttons);
        cy.get(secondDisplay).should('have.text', expectedEquation);
        cy.get(mainDisplay).should('have.text', expectedResult);
        clickButtons("clear");
      })
    })
  })
})


  /*
  cy.get('button').should('be.visible');
cy.get('input[name="username"]').should('exist');
cy.get('h1').should('have.text', 'Witaj na stronie!');
cy.get('.btn').should('have.class', 'active');
cy.get('a').should('have.attr', 'href', '/home');
cy.get('button').should('be.disabled');
cy.get('input[type="submit"]').should('be.enabled');
cy.get('input[name="username"]').should('have.value', 'testuser');
cy.get('.error-message').should('not.exist');
cy.get('.loading-spinner').should('not.be.visible');
cy.get('button').should('have.css', 'background-color', 'rgb(0, 123, 255)');
cy.get('li').should('have.length', 5);
cy.get('input[type="checkbox"]').should('be.checked');
cy.get('input[type="checkbox"]').should('not.be.checked');
cy.get('img').should('have.property', 'naturalWidth').and('be.gt', 0);
cy.get('input[type="email"]').should('match', /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
cy.get('input[name="username"]').should('be.focused');
cy.get('input[name="password"]').should('have.value', '');
cy.get('.message').should('be.empty');
cy.get('div.alert').should('be.visible');
cy.get('button').should('have.attr', 'disabled');
*/