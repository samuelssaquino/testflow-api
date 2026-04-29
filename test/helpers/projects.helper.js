const { validLoginPayload } = require("../fixtures/auth.fixture");
const { buildRequester, getAuthToken } = require("./auth.helper");

const createAuthenticatedHeaders = async () => {
  const token = await getAuthToken(validLoginPayload);

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};

const postProject = async (payload, headers = {}) => {
  const request = buildRequester().post("/projects").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

const getProjects = async (headers = {}) => {
  const request = buildRequester().get("/projects").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request;
};

const getProjectById = async (projectId, headers = {}) => {
  const request = buildRequester()
    .get(`/projects/${projectId}`)
    .set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request;
};

const patchProject = async (projectId, payload, headers = {}) => {
  const request = buildRequester()
    .patch(`/projects/${projectId}`)
    .set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

module.exports = {
  createAuthenticatedHeaders,
  postProject,
  getProjects,
  getProjectById,
  patchProject,
};
