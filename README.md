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

You can run `npm run test` command to run basic tests. You can find example output for tests. 

```bash
[03:55:48] [~/Code/tax_calculator] [master ✖] ❱❱❱ npm run test

> tax_calculator@0.0.1 test
> node tax_calculator_test.js

┌─────────┬───────┬─────────────┬────────────────┬────────────────────┐
│ (index) │ month │ grossIncome │ incomeTaxToPay │     netIncome      │
├─────────┼───────┼─────────────┼────────────────┼────────────────────┤
│    0    │   1   │   150000    │  17449.68125   │ 109063.63772500001 │
│    1    │   2   │   150000    │  24699.68125   │ 101813.63772500001 │
│    2    │   3   │   150000    │  31874.68125   │ 94638.63772500001  │
│    3    │   4   │   150000    │  31874.68125   │ 94638.63772500001  │
│    4    │   5   │   150000    │  36474.68125   │ 90038.63772500001  │
│    5    │   6   │   150000    │  42074.68125   │ 84438.63772500001  │
│    6    │   7   │   150000    │   41623.9375   │    84889.381475    │
│    7    │   8   │   150000    │   41224.575    │    85288.743975    │
│    8    │   9   │   150000    │   41224.575    │    85288.743975    │
│    9    │  10   │   150000    │   41224.575    │    85288.743975    │
│   10    │  11   │   150000    │   41224.575    │    85288.743975    │
│   11    │  12   │   150000    │   41224.575    │    85288.743975    │
└─────────┴───────┴─────────────┴────────────────┴────────────────────┘
```

Here is the usable variables from the tax calculator.

```
month: month + 1,
grossIncome,
cappedGrossIncome,
sgkEmployeeShare,
unemploymentInsurance,
incomeTaxBase,
cumulativeTaxBase,
calculatedIncomeTax,
minimumTaxExemption,
incomeTaxToPay,
stampDuty,
netIncome,
sgkEmployer,
unemploymentEmployerShare,
totalEmployerCost,
discountedEmployerCost,
```