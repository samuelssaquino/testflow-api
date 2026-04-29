const bugsService = require("../services/bugsService");

const createBug = (req, res) => {
  const { error, bug } = bugsService.createBug(req.body);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(201).json(bug);
};

const updateBug = (req, res) => {
  const { error, bug } = bugsService.updateBug(req.params.bugId, req.body);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(200).json(bug);
};

module.exports = {
  createBug,
  updateBug,
};
