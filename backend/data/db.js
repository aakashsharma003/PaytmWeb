const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/users");
const Account = require("../models/accounts");

// console.log(typeof process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then((c) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = { User, Account };
