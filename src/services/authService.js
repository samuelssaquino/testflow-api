const jwt = require("jsonwebtoken");

const FIXED_USER = "samuel.aquino";
const FIXED_PASSWORD = "123456";

const authenticate = (user, password) => {
  if (user !== FIXED_USER || password !== FIXED_PASSWORD) {
    return null;
  }

  return jwt.sign(
    { user: FIXED_USER },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  authenticate,
};
