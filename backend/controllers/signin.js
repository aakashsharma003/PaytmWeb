const { User } = require("../data/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../data/config");
const zod = require("zod");
const signinBody = zod.object({
  username: zod
    .string({
      required_error: "email must be required",
    })
    .email({
      message: "not a valid email",
    }),
  password: zod.string(),
});
const Signin = async (req, res) => {
  try {
    const { success, data } = signinBody.safeParse(req.body);
    const { username, password } = data;
    // console.log(username, password);
    if (!success) {
      return res.status(404).json({
        message: "incorrect inputs",
      });
    }
    console.log("User Validated Successfully");
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(404).json({
        message: "Provided email or password does'nt exists..!!",
      });
    }
    const userid = user._id;
    const name = user.first_name + " " + user.last_name;
    const token = jwt.sign({ userid }, JWT_SECRET);
    res.status(200).json({
      message: "User signed in succesfully",
      token,
      name,
    });
  } catch (err) {
    res.status(411).json({
      Error: err,
    });
  }
};
module.exports = Signin;
