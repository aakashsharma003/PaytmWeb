const { User } = require("../data/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../data/config");
const zod = require("zod");
const Account = require("../models/accounts");
const UserSchema = zod.object({
  first_name: zod.string({
    required_error: "fname must be required",
    invalid_type_error: "Name must be a string",
  }),
  last_name: zod.string(),
  username: zod.string().endsWith("@gmail.com", {
    message: "username must be end with @gmail.com",
  }),
  password: zod
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
});
const SignUp = async (req, res) => {
  try {
    const validatedInput = UserSchema.safeParse(req.body);
    const { first_name, last_name, username, password } = validatedInput.data;
    if (!validatedInput.success) {
      return res.status(404).json({
        msg: "inputs Validation failed",
      });
    }
    console.log("User Validated Successfully");
    const existingUser = await User.findOne({ username, first_name });
    if (existingUser) {
      return res.status(411).json({
        msg: "Name or Email already exists",
      });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      username,
      password,
    });
    await Account.create({
      userId: newUser._id,
      balance: Math.floor(1 + Math.random() * 10000),
    });
    const userid = newUser._id;
    const name = first_name + " " + last_name;
    const token = jwt.sign({ userid }, JWT_SECRET);
    res.status(200).json({
      msg: "User created successfully",
      userId: userid,
      token: token,
      name: name,
    });
  } catch (error) {
    res.status(411).json({ error: error.message });
  }
};
module.exports = SignUp;
