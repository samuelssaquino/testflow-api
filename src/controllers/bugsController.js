const bugsService = require("../services/bugsService");

const createBug = (req, res) => {
  const { error, bug } = bugsService.createBug(req.body);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(201).json(bug);
};

module.exports = {
  createBug,
};
