const validLoginPayload = Object.freeze({
  user: process.env.TEST_LOGIN_USER || "samuel.aquino",
  password: process.env.TEST_LOGIN_PASSWORD || "123456",
});

const invalidCredentialsPayload = Object.freeze({
  user: "invalid.user",
  password: "wrong-password",
});

module.exports = {
  validLoginPayload,
  invalidCredentialsPayload,
};
