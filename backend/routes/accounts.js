const express = require("express");
const getbalance = require("../controllers/getbalance");
const authMiddleware = require("../middlewares/middleware");
const transferMoney = require("../controllers/transferMoney");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, getbalance);
accountRouter.post("/transfermoney", authMiddleware, transferMoney);

module.exports = accountRouter;
