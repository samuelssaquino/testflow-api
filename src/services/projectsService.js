const { randomUUID } = require("crypto");

const VALID_STATUSES = ["active", "archived"];
const projects = [];

const createProject = ({ name, description, status }) => {
  const normalizedName = typeof name === "string" ? name.trim() : "";
  const normalizedDescription =
    typeof description === "string" ? description.trim() : "";
  const normalizedStatus = status || "active";

  if (!normalizedName) {
    return {
      error: {
        statusCode: 400,
        message: "Project name is required",
      },
    };
  }

  if (normalizedName.length < 3) {
    return {
      error: {
        statusCode: 400,
        message: "Project name must be at least 3 characters long",
      },
    };
  }

  if (!VALID_STATUSES.includes(normalizedStatus)) {
    return {
      error: {
        statusCode: 400,
        message: "Status must be either active or archived",
      },
    };
  }

  const duplicatedProject = projects.find(
    (project) => project.name.toLowerCase() === normalizedName.toLowerCase()
  );

  if (duplicatedProject) {
    return {
      error: {
        statusCode: 409,
        message: "Project name already exists",
      },
    };
  }

  const timestamp = new Date().toISOString();
  const project = {
    id: randomUUID(),
    name: normalizedName,
    description: normalizedDescription,
    status: normalizedStatus,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  projects.push(project);

  return { project };
};

const listProjects = () => {
  return [...projects];
};

const getProjectById = (projectId) => {
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return {
      error: {
        statusCode: 404,
        message: "Project not found",
      },
    };
  }

  return { project };
};

module.exports = {
  createProject,
  listProjects,
  getProjectById,
};
