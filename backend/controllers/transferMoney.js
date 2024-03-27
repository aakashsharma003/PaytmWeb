const mongoose = require("mongoose");
const { Account } = require("../data/db");
const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { to, amount } = req.body;

  const userId = req.userId;
  const fromAccount = await Account.findOne({ userId: userId }).session(
    session
  );
  //   console.log(fromAccount);
  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction();
    return res
      .status(400)
      .json({ message: "Insufficient balance in your account..!" });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "account does'nt exits" });
  }
  // Performing the transfer
  await Account.updateOne(
    { userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);
  // Commiting the transaction
  await session.commitTransaction();
  res.json({ message: "transfered Succesfully" });
};

module.exports = transferMoney;
