const jwt = require("jsonwebtoken");
const supertest = require("supertest");

const app = require("../../src/app");

const buildRequester = () => {
  if (process.env.BASE_URL) {
    return supertest(process.env.BASE_URL);
  }

  return supertest(app);
};

const postLogin = (payload) => {
  return buildRequester()
    .post("/login")
    .set("Accept", "application/json")
    .send(payload);
};

const getAuthToken = async (payload) => {
  const response = await postLogin(payload);

  if (response.status !== 200 || !response.body.token) {
    throw new Error("Failed to obtain authentication token for automated tests");
  }

  return response.body.token;
};

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  buildRequester,
  postLogin,
  getAuthToken,
  decodeToken,
};
