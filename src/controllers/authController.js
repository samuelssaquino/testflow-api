const authService = require("../services/authService");

const login = (req, res) => {
  const { user, password } = req.body || {};

  if (user === undefined || password === undefined) {
    return res.status(400).json({
      message: "user and password are required",
    });
  }

  if (typeof user !== "string" || typeof password !== "string") {
    return res.status(400).json({
      message: "user and password must be strings",
    });
  }

  if (!user.trim() || !password.trim()) {
    return res.status(400).json({
      message: "user and password cannot be empty",
    });
  }

  const token = authService.authenticate(user, password);

  if (!token) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};

module.exports = {
  login,
};
