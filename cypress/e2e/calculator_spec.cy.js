const secondDisplay = '.calculator__second-display';
const mainDisplay = '.calculator__main-display';

const clickButtons = (...buttonsSet) => {
  buttonsSet.forEach(button => cy.get(`[data-value="${button}"]`).click());
}

function performTests(data) {
  data.forEach(({buttons, expectedEquation, expectedResult}) => {
    clickButtons(...buttons);
    cy.get(secondDisplay).should('have.text', expectedEquation);
    cy.get(mainDisplay).should('have.text', expectedResult);
    clickButtons("clear");
  })
};

describe("calculator autotests", () => {
  beforeEach(function() {
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.fixture('calc_operations').then((data) => {
      this.data = data;
    });
  })

  describe('operations', () => {
    it('should perform basic operation cases', function() {
        performTests(this.data.basicOperations);
    })

    it('should perform zero operations cases', function() {
      performTests(this.data.zeroOperations)
    })

    it('should perform fraction operations cases', function() {
      performTests(this.data.fractionOperations)
    })

    it('should perform negative numbers operations cases', function() {
      performTests(this.data.negativeNumbers)
    })

    it('should perform large numbers operations cases', function() {
      performTests(this.data.largeNumbers)
    })
  })

  describe("error cases", () => {
    it('should perform error cases', function() {
      performTests(this.data.errorCases)
    })
  })

  describe("clear action", () => {
    it('should handle using clear button cases', function() {
      performTests(this.data.clearCases)
    })
  })

  describe("delete action", () => {
    it('should handle using delete button cases', function() {
      performTests(this.data.deleteCases)
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