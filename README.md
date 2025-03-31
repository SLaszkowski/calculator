# Calculator

A simple calculator application created mainly to learn the basics of unit, integration, and end-to-end (E2E) testing.

## Used Technologies
- **Vanilla JavaScript (ES6+)**, **HTML5**, **CSS**
- **Jest** for Unit and Integration Testing
- **Cypress** for E2E Testing

## How to Run Calculator
1. Clone the repository:
   ```bash
   git clone https://github.com/SLaszkowski/calculator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd calculator
   ```
3. Open `Visual studio code` -> install `Live Server` VSC extension
4. Right-click on the `index.html` and select `Open with Live Server` to use the calculator.

## How to Run Tests
- Install last stable version of Node.js https://nodejs.org
- Run `Live Server`
- **Install npm**
  ```bash
  npm install
  ```
- ### **Unit and Integration Tests**:
  Run with Jest:
  ```bash
  npm test
  ```
- ### **E2E Tests**:
  Run E2E Cypress tests with GUI:
  ```bash
  npm run e2e
  ```
  or in headless mode:
  ```bash
  npx cypress run
  ```

## Demo
<img src="assets/calculator_demo.gif" width="400" alt="calculator demo">