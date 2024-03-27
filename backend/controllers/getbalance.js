const { Account } = require("../data/db");
const getbalance = async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({ userId: userId });
  //   console.log(account);
  res.status(200).json({
    balance: account.balance,
  });
};

module.exports = getbalance;
