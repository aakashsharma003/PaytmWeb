const SignUp = require("../controllers/signup");
const express = require("express");
const Signin = require("../controllers/signin");
const authMiddleware = require("../middlewares/middleware");
const updateUserData = require("../controllers/updateuserdata");
const filter = require("../controllers/bulkfilter");

const userRouter = express.Router();

userRouter.post("/signup", SignUp);

userRouter.post("/signin", Signin);
userRouter.put("/changepassword", authMiddleware, updateUserData);
userRouter.get("/bulk", filter);

module.exports = userRouter;
