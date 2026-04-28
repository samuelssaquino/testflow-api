const { expect } = require("chai");

const { buildProjectPayload } = require("../fixtures/projects.fixture");
const { buildTestCasePayload } = require("../fixtures/test-cases.fixture");
const { buildTestRunPayload } = require("../fixtures/test-runs.fixture");
const { createAuthenticatedHeaders, postProject } = require("../helpers/projects.helper");
const { postTestCase } = require("../helpers/test-cases.helper");
const { getTestRuns, postTestRun } = require("../helpers/test-runs.helper");

describe("Módulo Test Runs", () => {
  let authHeaders;
  let projectId;
  let testCaseId;

  before(async () => {
    authHeaders = await createAuthenticatedHeaders();
  });

  beforeEach(async () => {
    const projectResponse = await postProject(buildProjectPayload(), authHeaders);
    projectId = projectResponse.body.id;

    const testCaseResponse = await postTestCase(
      buildTestCasePayload({ projectId }),
      authHeaders
    );
    testCaseId = testCaseResponse.body.id;
  });

  describe("POST /test-runs", () => {
    let payload;

    beforeEach(() => {
      payload = buildTestRunPayload({ projectId, testCaseIds: [testCaseId] });
    });

    it("deve criar execução de teste com dados válidos e token válido", async () => {
      const response = await postTestRun(payload, authHeaders);

      expect(response.status).to.equal(201);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.include({
        projectId: payload.projectId,
        title: payload.title,
        description: payload.description,
        status: payload.status,
        executedBy: payload.executedBy,
        startedAt: payload.startedAt,
        finishedAt: payload.finishedAt,
      });
      expect(response.body).to.have.property("id").that.is.a("string").and.is.not.empty;
      expect(response.body).to.have.property("testCaseIds").that.deep.equals(payload.testCaseIds);
      expect(response.body).to.have.property("createdAt").that.is.a("string");
      expect(response.body).to.have.property("updatedAt").that.is.a("string");
    });

    it("deve usar pending como status padrão quando status não for enviado", async () => {
      const response = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [testCaseId], status: undefined }),
        authHeaders
      );

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("status", "pending");
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await postTestRun(payload);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await postTestRun(payload, {
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar 400 quando projectId não for enviado", async () => {
      const invalidPayload = buildTestRunPayload({ projectId, testCaseIds: [testCaseId] });

      delete invalidPayload.projectId;

      const response = await postTestRun(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Project ID is required",
      });
    });

    it("deve retornar 400 quando title não for enviado", async () => {
      const invalidPayload = buildTestRunPayload({ projectId, testCaseIds: [testCaseId] });

      delete invalidPayload.title;

      const response = await postTestRun(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test run title is required",
      });
    });

    it("deve retornar 400 quando title tiver menos de 3 caracteres", async () => {
      const response = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [testCaseId], title: "AB" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test run title must be at least 3 characters long",
      });
    });

    it("deve retornar 400 quando testCaseIds não for enviado", async () => {
      const invalidPayload = buildTestRunPayload({ projectId, testCaseIds: [testCaseId] });

      delete invalidPayload.testCaseIds;

      const response = await postTestRun(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test case IDs must be an array with at least 1 item",
      });
    });

    it("deve retornar 400 quando testCaseIds não for array", async () => {
      const response = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: "invalid-value" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test case IDs must be an array with at least 1 item",
      });
    });

    it("deve retornar 400 quando testCaseIds for array vazio", async () => {
      const response = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [] }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test case IDs must be an array with at least 1 item",
      });
    });

    it("deve retornar 400 quando houver testCaseIds duplicados", async () => {
      const response = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [testCaseId, testCaseId] }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Duplicated test case IDs are not allowed in the same test run",
      });
    });

    it("deve retornar 400 quando status for inválido", async () => {
      const response = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [testCaseId], status: "active" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Status must be one of: pending, in_progress, completed",
      });
    });

    it("deve retornar 400 quando executedBy não for enviado", async () => {
      const invalidPayload = buildTestRunPayload({ projectId, testCaseIds: [testCaseId] });

      delete invalidPayload.executedBy;

      const response = await postTestRun(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Executed by is required and must be a string",
      });
    });

    it("deve retornar 400 quando executedBy não for string", async () => {
      const response = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [testCaseId], executedBy: 123 }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Executed by is required and must be a string",
      });
    });

    it("deve retornar 400 quando startedAt for data inválida", async () => {
      const response = await postTestRun(
        buildTestRunPayload({
          projectId,
          testCaseIds: [testCaseId],
          startedAt: "invalid-date",
        }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Started at must be a valid date",
      });
    });

    it("deve retornar 400 quando finishedAt for data inválida", async () => {
      const response = await postTestRun(
        buildTestRunPayload({
          projectId,
          testCaseIds: [testCaseId],
          finishedAt: "invalid-date",
        }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Finished at must be a valid date",
      });
    });

    it("deve retornar 400 quando finishedAt for menor que startedAt", async () => {
      const response = await postTestRun(
        buildTestRunPayload({
          projectId,
          testCaseIds: [testCaseId],
          startedAt: "2026-04-28T11:00:00.000Z",
          finishedAt: "2026-04-28T10:00:00.000Z",
        }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Finished at cannot be earlier than started at",
      });
    });

    it("deve retornar 404 quando projectId não existir", async () => {
      const response = await postTestRun(
        buildTestRunPayload({
          projectId: "non-existent-project-id",
          testCaseIds: [testCaseId],
        }),
        authHeaders
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Project not found",
      });
    });

    it("deve retornar 404 quando algum testCaseId não existir", async () => {
      const response = await postTestRun(
        buildTestRunPayload({
          projectId,
          testCaseIds: ["non-existent-test-case-id"],
        }),
        authHeaders
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Test case not found",
      });
    });

    it("deve retornar 400 quando algum testCaseId não pertencer ao projectId informado", async () => {
      const anotherProjectResponse = await postProject(buildProjectPayload(), authHeaders);
      const anotherProjectId = anotherProjectResponse.body.id;

      const response = await postTestRun(
        buildTestRunPayload({
          projectId: anotherProjectId,
          testCaseIds: [testCaseId],
        }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "All test cases must belong to the provided project",
      });
    });

    it("deve retornar 409 quando já existir execução com o mesmo title dentro do mesmo projectId", async () => {
      const duplicatePayload = buildTestRunPayload({ projectId, testCaseIds: [testCaseId] });

      await postTestRun(duplicatePayload, authHeaders);
      const response = await postTestRun(duplicatePayload, authHeaders);

      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal({
        message: "Test run title already exists in this project",
      });
    });
  });

  describe("GET /test-runs", () => {
    it("deve listar execuções de teste com token válido", async () => {
      const createdTestRun = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [testCaseId] }),
        authHeaders
      );
      const response = await getTestRuns(authHeaders);

      expect(createdTestRun.status).to.equal(201);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.some((testRun) => testRun.id === createdTestRun.body.id)).to.equal(
        true
      );
    });

    it("deve retornar um array", async () => {
      const response = await getTestRuns(authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await getTestRuns();

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await getTestRuns({
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });
  });
});
