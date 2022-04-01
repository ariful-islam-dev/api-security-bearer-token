const jwt = require("jsonwebtoken");
function authenticate(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      error: "Invalid Token",
    });
  }

  try {
    token = token.split(" ")[1];
    const user = jwt.verify(token, "JWT_STRONG_SECRET");
    req.user = user;
    next();
    
  } catch (err) {
    next(err);
  }
}

module.exports = authenticate;
