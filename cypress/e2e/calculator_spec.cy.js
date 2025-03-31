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