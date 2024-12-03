const calculateTax = (cumulativeIncome, incomeToBeTaxed, config) => {
  let tax = 0;
  let remainingIncome = cumulativeIncome;

  for (const { minAmount, maxAmount, percentage } of config.taxBrackets) {
    const bracketRange = maxAmount - minAmount;

    if (remainingIncome <= bracketRange) {
      tax += remainingIncome * percentage;
      return tax - incomeToBeTaxed;
    }

    tax += bracketRange * percentage;
    remainingIncome -= bracketRange;
  }

  return tax - incomeToBeTaxed;
};

const calculateEmployeeContributions = (grossIncome, config) => {
  const cappedGrossIncome = Math.min(grossIncome, config.sgkTavanUcreti);
  const sgkEmployeeShare = cappedGrossIncome * config.sgkPrimRate;
  const unemploymentInsurance = cappedGrossIncome * config.unemploymentInsuranceRate;

  return { cappedGrossIncome, sgkEmployeeShare, unemploymentInsurance };
};

const calculateEmployerCosts = (cappedGrossIncome, grossIncome, config) => {
  const sgkEmployer = cappedGrossIncome * config.sgkEmployerShare;
  const unemploymentEmployerShare = cappedGrossIncome * config.sgkEmployerUnemploymentShare;
  const employerShareDiscount = cappedGrossIncome * config.employerShareRate;

  const totalEmployerCost = grossIncome + sgkEmployer + unemploymentEmployerShare;
  const discountedEmployerCost = totalEmployerCost - employerShareDiscount;

  return { sgkEmployer, unemploymentEmployerShare, totalEmployerCost, discountedEmployerCost };
};

const calculateStampDuty = (grossIncome, config) => {
  const stampDutyBase = grossIncome - config.minimumWage;
  return stampDutyBase * config.stampDutyRate;
};

const calculateMonthlyTaxes = (salaries, config) => {
  const results = [];
  let cumulativeTaxBase = 0;
  let cumulativeTaxPaid = 0;
  let cumulativeMinimumTaxBase = 0;
  let cumulativeMinimumTaxPaid = 0;

  for (let month = 0; month < 12; month++) {
    const grossIncome = salaries[month] ?? 0;

    const {
      cappedGrossIncome,
      sgkEmployeeShare,
      unemploymentInsurance,
    } = calculateEmployeeContributions(grossIncome, config);

    const incomeTaxBase = grossIncome - sgkEmployeeShare - unemploymentInsurance;
    cumulativeTaxBase += incomeTaxBase;

    const calculatedIncomeTax = calculateTax(cumulativeTaxBase, cumulativeTaxPaid, config);
    cumulativeTaxPaid += calculatedIncomeTax;

    cumulativeMinimumTaxBase += config.minimumWage * 0.85;
    const minimumTaxExemption = calculateTax(cumulativeMinimumTaxBase, cumulativeMinimumTaxPaid, config);
    cumulativeMinimumTaxPaid += minimumTaxExemption;

    const incomeTaxToPay = calculatedIncomeTax - minimumTaxExemption;

    const stampDuty = calculateStampDuty(grossIncome, config);

    const netIncome = incomeTaxBase - incomeTaxToPay - stampDuty;

    const {
      sgkEmployer,
      unemploymentEmployerShare,
      totalEmployerCost,
      discountedEmployerCost,
    } = calculateEmployerCosts(cappedGrossIncome, grossIncome, config);

    results.push({
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
    });
  }

  return results;
};

export default calculateMonthlyTaxes

