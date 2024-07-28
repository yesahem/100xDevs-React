const express = require("express");
const { authMiddleware } = require("./middleware");
const { User, Account } = require("../db");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await User.findOne({
    userID: req.userID,
  });

  res.json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;
  const account = await Account.findOne({
    userID: req.userID,
  });

  if (account.balance < amount) {
    res.status(400).json({
      msg: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userID: to,
  });
  if (!toAccount.userID) {
    res.status(400).json({
      msg: "Invalid account",
    });
  }
  await Account.updateOne(
    {
      userID: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    },
  );

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    },
  );
  res.status(200).json({
    msg: "Transaction sucessfull",
  });
});
module.exports = accountRouter;
