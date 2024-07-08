const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: float,
    required: true,
  },
});

const Account = mongoose.model("Accounts", AccountSchema);
module.exports = Account;
