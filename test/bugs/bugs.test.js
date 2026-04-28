const { expect } = require("chai");

const { buildProjectPayload } = require("../fixtures/projects.fixture");
const { buildTestCasePayload } = require("../fixtures/test-cases.fixture");
const { buildTestRunPayload } = require("../fixtures/test-runs.fixture");
const { buildBugPayload } = require("../fixtures/bugs.fixture");
const { createAuthenticatedHeaders, postProject } = require("../helpers/projects.helper");
const { postTestCase } = require("../helpers/test-cases.helper");
const { postTestRun } = require("../helpers/test-runs.helper");
const { postBug } = require("../helpers/bugs.helper");

describe("Módulo Bugs", () => {
  let authHeaders;
  let projectId;
  let testCaseId;
  let testRunId;

  const createSupportData = async () => {
    const projectResponse = await postProject(buildProjectPayload(), authHeaders);
    projectId = projectResponse.body.id;

    const testCaseResponse = await postTestCase(
      buildTestCasePayload({ projectId }),
      authHeaders
    );
    testCaseId = testCaseResponse.body.id;

    const testRunResponse = await postTestRun(
      buildTestRunPayload({ projectId, testCaseIds: [testCaseId] }),
      authHeaders
    );
    testRunId = testRunResponse.body.id;
  };

  before(async () => {
    authHeaders = await createAuthenticatedHeaders();
  });

  beforeEach(async () => {
    await createSupportData();
  });

  describe("POST /bugs", () => {
    let payload;

    beforeEach(() => {
      payload = buildBugPayload({ testRunId, testCaseId });
    });

    it("deve criar bug com dados válidos e token válido", async () => {
      const response = await postBug(payload, authHeaders);

      expect(response.status).to.equal(201);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.include({
        testRunId: payload.testRunId,
        testCaseId: payload.testCaseId,
        title: payload.title,
        description: payload.description,
        severity: payload.severity,
        priority: payload.priority,
        status: payload.status,
        evidence: payload.evidence,
        stepsToReproduce: payload.stepsToReproduce,
      });
      expect(response.body).to.have.property("id").that.is.a("string").and.is.not.empty;
      expect(response.body).to.have.property("createdAt").that.is.a("string");
      expect(response.body).to.have.property("updatedAt").that.is.a("string");
    });

    it("deve usar open como status padrão quando status não for enviado", async () => {
      const response = await postBug(
        buildBugPayload({ testRunId, testCaseId, status: undefined }),
        authHeaders
      );

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("status", "open");
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await postBug(payload);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await postBug(payload, {
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar 400 quando testRunId não for enviado", async () => {
      const invalidPayload = buildBugPayload({ testRunId, testCaseId });

      delete invalidPayload.testRunId;

      const response = await postBug(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test run ID is required",
      });
    });

    it("deve retornar 400 quando testCaseId não for enviado", async () => {
      const invalidPayload = buildBugPayload({ testRunId, testCaseId });

      delete invalidPayload.testCaseId;

      const response = await postBug(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test case ID is required",
      });
    });

    it("deve retornar 400 quando title não for enviado", async () => {
      const invalidPayload = buildBugPayload({ testRunId, testCaseId });

      delete invalidPayload.title;

      const response = await postBug(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Bug title is required",
      });
    });

    it("deve retornar 400 quando title tiver menos de 3 caracteres", async () => {
      const response = await postBug(
        buildBugPayload({ testRunId, testCaseId, title: "AB" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Bug title must be at least 3 characters long",
      });
    });

    it("deve retornar 400 quando description não for enviada", async () => {
      const invalidPayload = buildBugPayload({ testRunId, testCaseId });

      delete invalidPayload.description;

      const response = await postBug(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Bug description is required",
      });
    });

    it("deve retornar 400 quando severity for inválida", async () => {
      const response = await postBug(
        buildBugPayload({ testRunId, testCaseId, severity: "urgent" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Severity must be one of: low, medium, high, critical",
      });
    });

    it("deve retornar 400 quando priority for inválida", async () => {
      const response = await postBug(
        buildBugPayload({ testRunId, testCaseId, priority: "urgent" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Priority must be one of: low, medium, high, critical",
      });
    });

    it("deve retornar 400 quando status for inválido", async () => {
      const response = await postBug(
        buildBugPayload({ testRunId, testCaseId, status: "active" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Status must be one of: open, in_progress, resolved, closed",
      });
    });

    it("deve retornar 404 quando testRunId não existir", async () => {
      const response = await postBug(
        buildBugPayload({ testRunId: "non-existent-test-run-id", testCaseId }),
        authHeaders
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Test run not found",
      });
    });

    it("deve retornar 404 quando testCaseId não existir", async () => {
      const response = await postBug(
        buildBugPayload({ testRunId, testCaseId: "non-existent-test-case-id" }),
        authHeaders
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Test case not found",
      });
    });

    it("deve retornar 409 quando já existir bug duplicado para o mesmo testRunId e testCaseId", async () => {
      const duplicatePayload = buildBugPayload({ testRunId, testCaseId });

      await postBug(duplicatePayload, authHeaders);
      const response = await postBug(duplicatePayload, authHeaders);

      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal({
        message: "Bug title already exists for this test run and test case",
      });
    });
  });
});
