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
}

const salaries = [150_000, 150_000, 150_000, 150_000, 150_000, 150_000, 150_000, 150_000, 150_000, 150_000, 150_000, 150_000];
const results = calculateMonthlyTaxes(salaries, config);

const corrects = [
    17449.68125, 24699.68125,
    31874.68125, 31874.68125,
    36474.68125, 42074.68125,
    41623.9375, 41224.575,
    41224.575, 41224.575,
    41224.575, 41224.575
]
for (let i in results) {
    console.log(results[i].incomeTaxToPay === corrects[i])
}
