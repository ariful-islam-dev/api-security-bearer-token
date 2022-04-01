const User = require("./User");
const bcrypt = require("bcryptjs");

const router = require("express").Router();

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        error: "Email Already Exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();

    res.status(201).json({ message: "User Create Successful", user });
  } catch (err) {
    next(err);
  }
});
router.post("/login", (req, res) => {});

module.exports = router;
