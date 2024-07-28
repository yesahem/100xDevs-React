const mongoose = require("mongoose");
const Account = require("./db");

async function transferFunds(fromAccountID, toAccountID, amount) {
  // Decrese / debit the account by given amount transfer
  await Account.findOneAndUpdate(
    { fromAccountID },
    { $inc: { balance: -amount } },
  );

  await Account.findOneAndUpdate(
    { toAccountID },
    { $inc: { balance: amount } },
  );
}
