const projectsService = require("../services/projectsService");

const createProject = (req, res) => {
  const { error, project } = projectsService.createProject(req.body);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(201).json(project);
};

module.exports = {
  createProject,
};
