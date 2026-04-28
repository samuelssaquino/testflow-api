const { buildRequester } = require("./auth.helper");

const postTestCase = async (payload, headers = {}) => {
  const request = buildRequester().post("/test-cases").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

const getTestCases = async (headers = {}) => {
  const request = buildRequester().get("/test-cases").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request;
};

const patchTestCase = async (testCaseId, payload, headers = {}) => {
  const request = buildRequester()
    .patch(`/test-cases/${testCaseId}`)
    .set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

module.exports = {
  postTestCase,
  getTestCases,
  patchTestCase,
};
