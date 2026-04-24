const authService = require("../services/authService");

const login = (req, res) => {
  const { user, password } = req.body;

  const token = authService.authenticate(user, password);

  if (!token) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({ token });
};

module.exports = {
  login,
};
