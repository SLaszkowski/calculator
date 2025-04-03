# Calculator

A simple calculator application created mainly to learn the basics of unit, integration, and end-to-end (E2E) testing.

## Used Technologies
- **Vanilla JavaScript (ES6+)**, **HTML5**, **CSS**
- **Jest** for Unit and Integration Testing
- **Cypress** for E2E Testing

## Test Results
[![Jest Unit Tests](https://github.com/SLaszkowski/calculator/actions/workflows/jest-unit-tests.yml/badge.svg)](https://github.com/SLaszkowski/calculator/actions/workflows/jest-unit-tests.yml)
[![Jest Integration Tests](https://github.com/SLaszkowski/calculator/actions/workflows/jest-integration-tests.yml/badge.svg)](https://github.com/SLaszkowski/calculator/actions/workflows/jest-integration-tests.yml)
[![Cypress E2E Tests](https://github.com/SLaszkowski/calculator/actions/workflows/cypress-e2e-tests.yml/badge.svg)](https://github.com/SLaszkowski/calculator/actions/workflows/cypress-e2e-tests.yml)

## How to Run Calculator
1. Clone the repository:
    ```bash
    git clone https://github.com/SLaszkowski/calculator.git
    ```
2. Navigate to the project directory:
    ```bash
    cd calculator
    ```
3. Run local server
    ```bash
    npm start
    ```
4. Open Calculator http://localhost:5500/

## How to Run Tests
- Install last stable version of Node.js https://nodejs.org
- Install npm
  ```bash
  npm install
  ```
- #### **Unit and Integration Tests**:
  Run with Jest:
  ```bash
  npm test
  ```
- #### **E2E Tests**:
  Run E2E Cypress tests:
  ```bash
  npm start
  npm run cypress:headless
  ```

## Demo
<img src="assets/calculator_demo.gif" width="400" alt="calculator demo">