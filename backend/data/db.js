const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/users");
const Account = require("../models/accounts");

// console.log(typeof process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "PaytmWeb",
  })
  .then((c) => {
    console.log(`Database connected with ${c.connection.host}`);
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = { User, Account };
/**trying to commit from phone **/
