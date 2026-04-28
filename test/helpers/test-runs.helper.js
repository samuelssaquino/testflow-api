const { buildRequester } = require("./auth.helper");

const postTestRun = async (payload, headers = {}) => {
  const request = buildRequester().post("/test-runs").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

module.exports = {
  postTestRun,
};
