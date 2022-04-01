const passport = require("passport");
const jwt = require("jsonwebtoken");
const BearerStrategy = require("passport-http-bearer");
const User = require("./User");

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const decode = jwt.verify(token, "JWT_STRONG_SECRET");
      const user = await User.findById(decode._id).select("-password");

      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (e) {
      done(e)
    }
  })
);
