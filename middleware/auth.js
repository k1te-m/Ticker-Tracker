const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtENV = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  // Check for token
  if (!token) res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtENV);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
