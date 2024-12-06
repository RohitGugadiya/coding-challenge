fetch("./data.json")
  .then((data) => data.json())
  .then((data) => {
    let accountData = data.data;
    let ravanue = 0;
    let expense = 0;
    let totalValue = 0;
    let totalAssetsValue = 0;

    console.log(accountData);

    function revenuefun() {
      accountData.forEach((account) => {
        if (account.account_category === "revenue") {
          ravanue += account.total_value;
        }
      });
      console.log(`Revenue: $${ravanue}`);
    }

    function expenseFun() {
      accountData.forEach((account) => {
        if (account.account_category === "expense") {
          expense += account.total_value;
        }
      });
      console.log(`Expense : $${expense}`);
    }
    function grossProfitMargin() {
      accountData.forEach((account) => {
        if (
          account.account_type === "sales" &&
          account.value_type === "debit"
        ) {
          totalValue += account.total_value;
        }
      });
      let grossProfitRatio = (totalValue / ravanue) * 100;
      console.log(`Gross rofit margin: ${grossProfitRatio}%`);
    }

    function netProfitMargin() {
      let np = ((ravanue - expense) / ravanue) * 100;
      console.log(`Net profit margin: ${Math.round(np)}%`);
    }

    function assets() {
      let totalAssetsDebit = 0;
      let totalAssetsCredit = 0;
      let totalLiabilityCredit = 0;
      let totalLiabilityDebit = 0;

      accountData.forEach((account) => {
        if (
          account.account_category === "assets" &&
          account.value_type === "debit" &&
          (account.account_type === "current" ||
            account.account_type === "bank" ||
            account.account_type === "current_accounts_receivable")
        ) {
          totalAssetsDebit += account.total_value;
        }
        if (
          account.account_category === "assets" &&
          account.value_type === "credit" &&
          (account.account_type === "current" ||
            account.account_type === "bank" ||
            account.account_type === "current_accounts_receivable")
        ) {
          totalAssetsCredit += account.total_value;
        }
        if (
          account.account_category === "liability" &&
          account.value_type === "credit" &&
          (account.account_type === "current" ||
            account.account_type === "current_accounts_payable")
        ) {
          totalLiabilityCredit += account.total_value;
        }
        if (
          account.account_category === "liability" &&
          account.value_type === "debit" &&
          (account.account_type === "current" ||
            account.account_type === "current_accounts_payable")
        ) {
          totalLiabilityDebit += account.total_value;
        }
      });
      totalLiabilityValue = (totalLiabilityCredit - totalLiabilityDebit) / 100;
      totalAssetsValue = (totalAssetsDebit - totalAssetsCredit) / 100;

      let workingCapitalRatio = totalAssetsValue - totalLiabilityValue;

      console.log(`Working Capital Ratio: ${Math.round(workingCapitalRatio)}%`);
    }

    revenuefun();
    expenseFun();
    grossProfitMargin();
    netProfitMargin();
    assets();
  });
