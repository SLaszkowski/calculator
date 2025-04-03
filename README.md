# Calculator

A simple calculator application created mainly to explore the basics of unit, integration, and end-to-end testing.

## Used Technologies

![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Cypress](https://img.shields.io/badge/-Cypress-17202C?style=flat-square&logo=cypress)

## Test Results
[![Jest Unit Tests](https://github.com/SLaszkowski/calculator/actions/workflows/jest-unit-tests.yml/badge.svg)](https://github.com/SLaszkowski/calculator/actions/workflows/jest-unit-tests.yml)
[![Coverage Status](https://codecov.io/gh/SLaszkowski/calculator/branch/main/graph/badge.svg)](https://codecov.io/gh/SLaszkowski/calculator)
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