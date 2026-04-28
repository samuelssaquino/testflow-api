const { buildRequester } = require("./auth.helper");

const postTestRun = async (payload, headers = {}) => {
  const request = buildRequester().post("/test-runs").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

const getTestRuns = async (headers = {}) => {
  const request = buildRequester().get("/test-runs").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request;
};

module.exports = {
  postTestRun,
  getTestRuns,
};
