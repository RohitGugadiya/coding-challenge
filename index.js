fetch("./data.json")
  .then((data) => data.json())
  .then((data) => {
    let accountData = data.data;
    let ravanue = 0;
    let expense = 0;
    let totalValue = 0;

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
      console.log(`Gross profit margin: ${grossProfitRatio}%`);
    }

    function netProfitMargin() {
      console.log(ravanue);
      console.log(expense);
      let np = ((ravanue - expense) / ravanue) * 100;
      console.log(`Net profit margin: ${Math.round(np)}%`);
    }

    revenuefun();
    expenseFun();
    grossProfitMargin();
    netProfitMargin();
  });
