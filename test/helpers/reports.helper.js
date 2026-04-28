const path = require("path");

const supertest = require("supertest");

const { validLoginPayload } = require("../fixtures/auth.fixture");

const srcRootPath = path.resolve(__dirname, "../../src");

const clearSourceModulesFromCache = () => {
  Object.keys(require.cache).forEach((modulePath) => {
    if (modulePath.startsWith(srcRootPath)) {
      delete require.cache[modulePath];
    }
  });
};

const createIsolatedRequester = () => {
  clearSourceModulesFromCache();
  const app = require("../../src/app");

  return supertest(app);
};

const postLogin = (requester, payload) => {
  return requester.post("/login").set("Accept", "application/json").send(payload);
};

const createAuthenticatedHeaders = async (requester) => {
  const response = await postLogin(requester, validLoginPayload);

  if (response.status !== 200 || !response.body.token) {
    throw new Error("Falha ao obter token de autenticacao para os testes de relatorios");
  }

  return {
    Authorization: `Bearer ${response.body.token}`,
    Accept: "application/json",
  };
};

const sendRequest = (request, headers = {}, payload) => {
  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  if (payload === undefined) {
    return request;
  }

  return request.send(payload);
};

const postProject = (requester, payload, headers = {}) => {
  return sendRequest(
    requester.post("/projects").set("Accept", "application/json"),
    headers,
    payload
  );
};

const postTestCase = (requester, payload, headers = {}) => {
  return sendRequest(
    requester.post("/test-cases").set("Accept", "application/json"),
    headers,
    payload
  );
};

const postTestRun = (requester, payload, headers = {}) => {
  return sendRequest(
    requester.post("/test-runs").set("Accept", "application/json"),
    headers,
    payload
  );
};

const postBug = (requester, payload, headers = {}) => {
  return sendRequest(
    requester.post("/bugs").set("Accept", "application/json"),
    headers,
    payload
  );
};

const getExecutionSummary = (requester, headers = {}) => {
  return sendRequest(
    requester.get("/reports/execution-summary").set("Accept", "application/json"),
    headers
  );
};

module.exports = {
  createAuthenticatedHeaders,
  createIsolatedRequester,
  getExecutionSummary,
  postBug,
  postProject,
  postTestCase,
  postTestRun,
};
