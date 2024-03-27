const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const app = express();
require("dotenv").config();
// console.log(process.env); // remove this after you've confirmed it is working
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Our app is listening on port ${PORT}`);
});
// api/v1/user/signup
// api/v1/user/signin
// api/v1/user/changepassword

// api/v1/account/transferMoney
// api/v1/account/balance
