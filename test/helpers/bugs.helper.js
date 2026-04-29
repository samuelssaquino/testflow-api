const { buildRequester } = require("./auth.helper");

const postBug = async (payload, headers = {}) => {
  const request = buildRequester().post("/bugs").set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

const patchBug = async (bugId, payload, headers = {}) => {
  const request = buildRequester()
    .patch(`/bugs/${bugId}`)
    .set("Accept", "application/json");

  Object.entries(headers).forEach(([key, value]) => {
    request.set(key, value);
  });

  return request.send(payload);
};

module.exports = {
  patchBug,
  postBug,
};
