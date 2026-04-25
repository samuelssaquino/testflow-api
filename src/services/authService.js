const jwt = require("jsonwebtoken");

const FIXED_USER = "samuel.aquino";
const FIXED_PASSWORD = "123456";
const FIXED_ROLE = "admin";

const authenticate = (user, password) => {
  const normalizedUser = user.trim();

  if (normalizedUser !== FIXED_USER || password !== FIXED_PASSWORD) {
    return null;
  }

  return jwt.sign(
    { user: normalizedUser, role: FIXED_ROLE },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  authenticate,
};
