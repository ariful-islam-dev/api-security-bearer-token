const jwt = require("jsonwebtoken");
const User = require("./User");
async function authenticate(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      error: "Invalid Token",
    });
  }

  try {
    token = token.split(" ")[1];
    const decode = await jwt.verify(token, "JWT_STRONG_SECRET");
    const user = await User.findById(decode._id).select("-password");
    req.user = user;
    next();
  } catch (err) {
    const error = new Error("Invalid Token");
    error.status = 400;
    throw error;
  }
}

module.exports = authenticate;
