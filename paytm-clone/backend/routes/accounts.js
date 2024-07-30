const express = require("express");
const { authMiddleware } = require("./middleware");
const { User, Account } = require("../db");
const { default: mongoose } = require("mongoose");

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
  const session = await mongoose.startSession();

  const { amount, to } = req.body;
  const account = await Account.findOne({
    userID: req.userID,
  }).session({ session });

  if (account.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userID: to,
  }).session({ session });
  if (!toAccount.userID) {
    await session.abortTransaction();
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
  ).session({ session });

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    },
  ).session({ session });

  await session.commitTransaction();
  res.status(200).json({
    msg: "Transaction sucessfull",
  });
  await session.endSession();
});
module.exports = accountRouter;
