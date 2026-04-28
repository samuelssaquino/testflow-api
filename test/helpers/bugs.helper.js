const { buildRequester } = require("./auth.helper");

const postBug = async (payload, headers = {}) => {
  const request = buildRequester().post("/bugs").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

module.exports = {
  postBug,
};
