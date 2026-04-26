const { expect } = require("chai");

const { validLoginPayload } = require("../fixtures/auth.fixture");
const { decodeToken, postLogin } = require("../helpers/auth.helper");

describe("POST /login", () => {
  let payload;

  beforeEach(() => {
    payload = {
      user: validLoginPayload.user,
      password: validLoginPayload.password,
    };
  });

  it("deve retornar 200 para credenciais válidas", async () => {
    const response = await postLogin(payload);

    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("application/json");
    expect(response.body).to.have.property("message", "Login successful");
  });

  it("deve retornar um token JWT para credenciais válidas", async () => {
    const response = await postLogin(payload);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token").that.is.a("string").and.is.not.empty;
    expect(response.body).to.not.have.property("password");
  });

  it("deve autenticar quando o user contiver espaços antes e depois", async () => {
    const response = await postLogin({
      ...payload,
      user: `  ${payload.user}  `,
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token").that.is.a("string");
  });

  it("deve retornar 400 quando o user não for enviado", async () => {
    const response = await postLogin({
      password: payload.password,
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "user and password are required",
    });
  });

  it("deve retornar 400 quando a password não for enviada", async () => {
    const response = await postLogin({
      user: payload.user,
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "user and password are required",
    });
  });

  it("deve retornar 400 quando o user for uma string vazia", async () => {
    const response = await postLogin({
      ...payload,
      user: "",
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "user and password cannot be empty",
    });
  });

  it("deve retornar 400 quando a password for uma string vazia", async () => {
    const response = await postLogin({
      ...payload,
      password: "",
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "user and password cannot be empty",
    });
  });

  it("deve retornar 400 quando o user não for uma string", async () => {
    const response = await postLogin({
      ...payload,
      user: 123,
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "user and password must be strings",
    });
  });

  it("deve retornar 400 quando a password não for uma string", async () => {
    const response = await postLogin({
      ...payload,
      password: 123456,
    });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "user and password must be strings",
    });
  });

  it("deve retornar 401 quando o user estiver incorreto", async () => {
    const response = await postLogin({
      ...payload,
      user: "wrong.user",
    });

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: "Invalid credentials",
    });
  });

  it("deve retornar 401 quando a password estiver incorreta", async () => {
    const response = await postLogin({
      ...payload,
      password: "wrong-password",
    });

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: "Invalid credentials",
    });
  });

  it("não deve revelar se o erro ocorreu no user ou na password", async () => {
    const wrongUserResponse = await postLogin({
      ...payload,
      user: "wrong.user",
    });
    const wrongPasswordResponse = await postLogin({
      ...payload,
      password: "wrong-password",
    });

    expect(wrongUserResponse.status).to.equal(401);
    expect(wrongPasswordResponse.status).to.equal(401);
    expect(wrongUserResponse.body).to.deep.equal({
      message: "Invalid credentials",
    });
    expect(wrongPasswordResponse.body).to.deep.equal({
      message: "Invalid credentials",
    });
  });

  it("nunca deve retornar password no corpo da resposta", async () => {
    const successResponse = await postLogin(payload);
    const errorResponse = await postLogin({
      ...payload,
      password: "wrong-password",
    });

    expect(successResponse.body).to.not.have.property("password");
    expect(errorResponse.body).to.not.have.property("password");
  });

  it("deve incluir user e role no payload do JWT", async () => {
    const response = await postLogin(payload);
    const decodedToken = decodeToken(response.body.token);

    expect(response.status).to.equal(200);
    expect(decodedToken).to.include({
      user: validLoginPayload.user,
      role: "admin",
    });
  });

  it("deve incluir expiração no token JWT", async () => {
    const response = await postLogin(payload);
    const decodedToken = decodeToken(response.body.token);

    expect(response.status).to.equal(200);
    expect(decodedToken).to.have.property("iat").that.is.a("number");
    expect(decodedToken).to.have.property("exp").that.is.a("number");
    expect(decodedToken.exp).to.be.greaterThan(decodedToken.iat);
  });
});
