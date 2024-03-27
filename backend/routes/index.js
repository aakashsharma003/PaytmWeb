const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./accounts");
const cors = require("cors");

const router = express.Router();

router.use(cors()); // Call cors middleware function
router.use(express.json()); // Parse request bodies as JSON
router.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
router.use("/user", userRouter);
router.use("/account", accountRouter);
module.exports = router;
