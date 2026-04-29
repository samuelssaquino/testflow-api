const projectsService = require("../services/projectsService");

const createProject = (req, res) => {
  const { error, project } = projectsService.createProject(req.body);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(201).json(project);
};

const listProjects = (req, res) => {
  const projects = projectsService.listProjects();

  return res.status(200).json(projects);
};

const getProjectById = (req, res) => {
  const { error, project } = projectsService.getProjectById(req.params.projectId);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(200).json(project);
};

const updateProject = (req, res) => {
  const { error, project } = projectsService.updateProject(
    req.params.projectId,
    req.body
  );

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(200).json(project);
};

module.exports = {
  createProject,
  listProjects,
  getProjectById,
  updateProject,
};
