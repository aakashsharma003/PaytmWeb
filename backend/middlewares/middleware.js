const JWT_SECRET = require("../data/config");
const jwt = require("jsonwebtoken");
const { User } = require("../data/db");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token type is not Bearer" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded);
    // Retrieve user from database
    const user = await User.findOne({ _id: decoded.userid });
    // console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    // Set userId in the request object
    // console.log(decoded);
    req.userId = decoded.userid;

    // console.log(req.userId); // This should log the userId
    next();
  } catch (err) {
    return res.status(403).json({ msg: err.message });
  }
};

module.exports = authMiddleware;
