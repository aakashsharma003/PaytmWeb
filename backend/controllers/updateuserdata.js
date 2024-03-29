const { User } = require("../data/db");
const zod = require("zod");

const updatedBody = zod.object({
  password: zod.string().optional(),
  first_name: zod.string().optional(),
  last_name: zod.string().optional(),
});

const updateUserData = async (req, res) => {
  const { success } = updatedBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating Information",
    });
  }
  try {
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const userId = req.userId;
    // console.log(userId);
    const result = await User.updateMany(
      { _id: userId },
      {
        $set: {
          last_name: last_name,
          first_name: first_name,
          password: password,
        },
      }
    );

    // console.log("Updated documents:", result);
    res.status(200).send("Data updated successfully");
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).send("Internal server error");
  }
};
module.exports = updateUserData;
