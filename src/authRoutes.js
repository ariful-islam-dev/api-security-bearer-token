const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

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
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        error: "Invalid Password",
      });
    }

    const token = jwt.sign({_id:user._id, name: user.name, email: user.email}, "JWT_STRONG_SECRET", {expiresIn: '2h'})
    res.status(200).json({ message: "Login Successful", token });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
