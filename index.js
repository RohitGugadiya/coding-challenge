fetch("./data.json")
  .then((data) => data.json())
  .then((data) => {
    let accountData = data.data;
    let revenue = 0;
    let expense = 0;
    let totalValue = 0;
    let totalAssetsValue = 0;

    function revenueFun() {
      accountData.forEach((account) => {
        if (account.account_category === "revenue") {
          revenue += account.total_value;
        }
      });

      console.log(`Revenue: $${Math.round(revenue).toLocaleString()}`);
    }

    function expenseFun() {
      accountData.forEach((account) => {
        if (account.account_category === "expense") {
          expense += account.total_value;
        }
      });
      console.log(`Expenses : $${Math.round(expense).toLocaleString()}`);
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
      let grossProfitRatio = (totalValue / revenue) * 100;
      console.log(`Gross Profit Margin: ${grossProfitRatio}%`);
    }

    function netProfitMargin() {
      let np = ((revenue - expense) / revenue) * 100;
      console.log(`Net Profit Margin: ${Math.round(np)}%`);
    }

    function WorkingCapital() {
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

    revenueFun();
    expenseFun();
    grossProfitMargin();
    netProfitMargin();
    WorkingCapital();
  });
