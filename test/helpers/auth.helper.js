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

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  postLogin,
  decodeToken,
};
