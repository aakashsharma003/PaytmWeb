const mongoose = require("mongoose");
const { Account } = require("../data/db");
const { User } = require("../data/db");


const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  let { to, amount } = req.body;

  if(amount?.length == 0) res.status(400).send({message:"Pls enter some amount first"});
  
  // console.log(amount?.length)
  if (parseInt(amount) <= 0){ 
    // console.log(amount);
    return res.status(400).send({ message: "Pls Enter a valid amount" });}
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });
  const name = user.first_name + " " + user.last_name;

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
  res.json({ message: "transfered Succesfully", name });
};

module.exports = transferMoney;
