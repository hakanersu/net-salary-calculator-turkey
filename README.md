# Net Salary Calculator for Turkey

This project provides a simple and flexible net salary calculator based on gross salary for Turkey. Unlike other calculators, this package is designed to be easy to use and configure, without hardcoding values or relying on DOM manipulation.

## Features

- Calculate net salary from gross salary
- Configurable tax brackets and rates
- Supports SGK and unemployment insurance calculations
- Includes employer cost calculations
- Easy to integrate and use in any JavaScript project

## Installation

For now there isn't any installation option. You can just copy the tax_calculator.js and import your file.

## Usage
Here's an example of how to use the net salary calculator:

```js
import calculateMonthlyTaxes from './tax_calculator.js';

const config = {
  minimumWage: 20002.50,
  sgkTavanUcreti: 150018.90,
  sgkPrimRate: 0.14,
  unemploymentInsuranceRate: 0.01,
  stampDutyRate: 0.00759,
  sgkEmployerShare: 0.205,
  sgkEmployerUnemploymentShare: 0.02,
  employerShareRate: 0.05,
  taxBrackets: [
    { minAmount: 0, maxAmount: 110_000, percentage: 0.15 },
    { minAmount: 110_000, maxAmount: 230_000, percentage: 0.20 },
    { minAmount: 230_000, maxAmount: 580_000, percentage: 0.27 },
    { minAmount: 580_000, maxAmount: 3_000_000, percentage: 0.35 },
    { minAmount: 3_000_000, maxAmount: Infinity, percentage: 0.40 },
  ],
};

const salaries = [
  150_000, 150_000, 150_000, 150_000, 150_000, 150_000,
  150_000, 150_000, 150_000, 150_000, 150_000, 150_000
];

const results = calculateMonthlyTaxes(salaries, config);

console.log(results);
```


## Configuration

The config object allows you to customize the calculation parameters:
```
minimumWage: The minimum wage used for calculations.
sgkTavanUcreti: The maximum gross income for SGK calculations.
sgkPrimRate: The SGK premium rate for employees.
unemploymentInsuranceRate: The unemployment insurance rate for employees.
stampDutyRate: The stamp duty rate.
sgkEmployerShare: The SGK premium rate for employers.
sgkEmployerUnemploymentShare: The unemployment insurance rate for employers.
employerShareRate: The employer share rate.
taxBrackets: An array of tax brackets, each with minAmount, maxAmount, and percentage.
```


## Running Tests

You can run `npm run test` command to run basic tests.