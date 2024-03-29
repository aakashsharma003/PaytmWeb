const { User } = require("../data/db");

const filter = async (req, res) => {
  try {
    const filterQuery = req.query.filter || "";

    let users = await User.find({
      $or: [
        { first_name: { $regex: filterQuery, $options: "i" } },
        { last_name: { $regex: filterQuery, $options: "i" } },
      ],
    });
    // console.log(users);
    if (users.length == 0) {
      return res.json({
        message: "Not Found",
      });
    } else
      res.json({
        users: users.map((user) => {
          return {
            user_id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
          };
        }),
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = filter;
