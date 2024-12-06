fetch("./data.json")
  .then((data) => data.json())
  .then((data) => {
    let accountData = data.data;
    let ravanue = 0;
    let expense = 0;

    console.log(accountData);

    function revenuefun() {
      accountData.forEach((account) => {
        if (account.account_category === "revenue") {
          ravanue += account.total_value;
        }
      });
      console.log("$" + ravanue);
    }

    function expenseFun() {
      accountData.forEach((account) => {
        if (account.account_category === "expense") {
          expense += account.total_value;
        }
      });
      console.log("$" + expense);
    }

    revenuefun();
    expenseFun();
  });
