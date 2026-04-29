const { expect } = require("chai");

const { buildProjectPayload } = require("../fixtures/projects.fixture");
const { buildTestCasePayload } = require("../fixtures/test-cases.fixture");
const { buildTestRunPayload } = require("../fixtures/test-runs.fixture");
const { buildBugPayload } = require("../fixtures/bugs.fixture");
const { createAuthenticatedHeaders, postProject } = require("../helpers/projects.helper");
const {
  deleteTestCase,
  getTestCases,
  patchTestCase,
  postTestCase,
} = require("../helpers/test-cases.helper");
const { postTestRun, getTestRuns } = require("../helpers/test-runs.helper");
const { postBug } = require("../helpers/bugs.helper");

describe("Módulo Test Cases", () => {
  let authHeaders;
  let projectId;

  before(async () => {
    authHeaders = await createAuthenticatedHeaders();
  });

  beforeEach(async () => {
    const projectResponse = await postProject(buildProjectPayload(), authHeaders);

    projectId = projectResponse.body.id;
  });

  describe("POST /test-cases", () => {
    let payload;

    beforeEach(() => {
      payload = buildTestCasePayload({ projectId });
    });

    it("deve criar caso de teste com dados válidos e token válido", async () => {
      const response = await postTestCase(payload, authHeaders);

      expect(response.status).to.equal(201);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.include({
        projectId: payload.projectId,
        title: payload.title,
        description: payload.description,
        preconditions: payload.preconditions,
        expectedResult: payload.expectedResult,
        priority: payload.priority,
        status: payload.status,
      });
      expect(response.body).to.have.property("id").that.is.a("string").and.is.not.empty;
      expect(response.body).to.have.property("steps").that.deep.equals(payload.steps);
      expect(response.body).to.have.property("createdAt").that.is.a("string");
      expect(response.body).to.have.property("updatedAt").that.is.a("string");
    });

    it("deve usar draft como status padrão quando status não for enviado", async () => {
      const response = await postTestCase(
        buildTestCasePayload({ projectId, status: undefined }),
        authHeaders
      );

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("status", "draft");
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await postTestCase(payload);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await postTestCase(payload, {
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar 400 quando projectId não for enviado", async () => {
      const invalidPayload = buildTestCasePayload({ projectId });

      delete invalidPayload.projectId;

      const response = await postTestCase(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Project ID is required",
      });
    });

    it("deve retornar 404 quando projectId não existir", async () => {
      const response = await postTestCase(
        buildTestCasePayload({ projectId: "non-existent-project-id" }),
        authHeaders
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Project not found",
      });
    });

    it("deve retornar 400 quando title não for enviado", async () => {
      const invalidPayload = buildTestCasePayload({ projectId });

      delete invalidPayload.title;

      const response = await postTestCase(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test case title is required",
      });
    });

    it("deve retornar 400 quando title tiver menos de 3 caracteres", async () => {
      const response = await postTestCase(
        buildTestCasePayload({ projectId, title: "AB" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test case title must be at least 3 characters long",
      });
    });

    it("deve retornar 400 quando steps não for enviado", async () => {
      const invalidPayload = buildTestCasePayload({ projectId });

      delete invalidPayload.steps;

      const response = await postTestCase(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Steps must be an array with at least 1 item",
      });
    });

    it("deve retornar 400 quando steps não for array", async () => {
      const response = await postTestCase(
        buildTestCasePayload({ projectId, steps: "invalid steps" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Steps must be an array with at least 1 item",
      });
    });

    it("deve retornar 400 quando steps for array vazio", async () => {
      const response = await postTestCase(
        buildTestCasePayload({ projectId, steps: [] }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Steps must be an array with at least 1 item",
      });
    });

    it("deve retornar 400 quando expectedResult não for enviado", async () => {
      const invalidPayload = buildTestCasePayload({ projectId });

      delete invalidPayload.expectedResult;

      const response = await postTestCase(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Expected result is required",
      });
    });

    it("deve retornar 400 quando priority for inválida", async () => {
      const response = await postTestCase(
        buildTestCasePayload({ projectId, priority: "urgent" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Priority must be one of: low, medium, high, critical",
      });
    });

    it("deve retornar 400 quando status for inválido", async () => {
      const response = await postTestCase(
        buildTestCasePayload({ projectId, status: "active" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Status must be one of: draft, ready, deprecated",
      });
    });

    it("deve retornar 409 quando já existir test case com o mesmo title dentro do mesmo projectId", async () => {
      const duplicatePayload = buildTestCasePayload({ projectId });

      await postTestCase(duplicatePayload, authHeaders);
      const response = await postTestCase(duplicatePayload, authHeaders);

      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal({
        message: "Test case title already exists in this project",
      });
    });
  });

  describe("GET /test-cases", () => {
    it("deve listar test cases com token válido", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await getTestCases(authHeaders);

      expect(createdTestCase.status).to.equal(201);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.some((testCase) => testCase.id === createdTestCase.body.id)).to.equal(
        true
      );
    });

    it("deve retornar um array", async () => {
      const response = await getTestCases(authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await getTestCases();

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await getTestCases({
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });
  });

  describe("PATCH /test-cases/{testCaseId}", () => {
    it("deve atualizar parcialmente um test case com token válido", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const updatePayload = {
        title: `${createdTestCase.body.title} Updated`,
        description: "Updated description",
        preconditions: "Updated preconditions",
        steps: ["Updated step 1", "Updated step 2"],
        expectedResult: "Updated expected result",
      };

      const response = await patchTestCase(createdTestCase.body.id, updatePayload, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.include({
        title: updatePayload.title,
        description: updatePayload.description,
        preconditions: updatePayload.preconditions,
        expectedResult: updatePayload.expectedResult,
      });
      expect(response.body).to.have.property("steps").that.deep.equals(updatePayload.steps);
    });

    it("deve atualizar priority com valor válido", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        { priority: "critical" },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("priority", "critical");
    });

    it("deve atualizar status com valor válido", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        { status: "deprecated" },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("status", "deprecated");
    });

    it("deve atualizar updatedAt", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        { description: "Updated description for timestamp validation" },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(Date.parse(response.body.updatedAt)).to.be.greaterThanOrEqual(
        Date.parse(createdTestCase.body.updatedAt)
      );
    });

    it("deve retornar 404 quando o testCaseId não existir", async () => {
      const response = await patchTestCase(
        "non-existent-test-case-id",
        { title: "Updated title" },
        authHeaders
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Test case not found",
      });
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(createdTestCase.body.id, {
        title: "Updated title",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        { title: "Updated title" },
        { Authorization: "Bearer invalid-token" }
      );

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar 400 quando title tiver menos de 3 caracteres", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        { title: "AB" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Test case title must be at least 3 characters long",
      });
    });

    it("deve retornar 400 quando steps não for array", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        { steps: "invalid steps" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Steps must be an array with at least 1 item",
      });
    });

    it("deve retornar 400 quando steps for array vazio", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(createdTestCase.body.id, { steps: [] }, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Steps must be an array with at least 1 item",
      });
    });

    it("deve retornar 400 quando priority for inválida", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        { priority: "urgent" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Priority must be one of: low, medium, high, critical",
      });
    });

    it("deve retornar 400 quando status for inválido", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        { status: "active" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Status must be one of: draft, ready, deprecated",
      });
    });

    it("deve retornar 409 quando tentar atualizar para title duplicado dentro do mesmo projectId", async () => {
      const firstTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const secondTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        secondTestCase.body.id,
        { title: firstTestCase.body.title },
        authHeaders
      );

      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal({
        message: "Test case title already exists in this project",
      });
    });

    it("não deve permitir alterar id, projectId ou createdAt", async () => {
      const createdTestCase = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );
      const response = await patchTestCase(
        createdTestCase.body.id,
        {
          id: "new-id",
          projectId: "new-project-id",
          createdAt: "2026-01-01T00:00:00.000Z",
        },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "id cannot be updated",
      });
    });
  });

  describe("DELETE /test-cases/{testCaseId}", () => {
    let createdTestCase;

    beforeEach(async () => {
      const createResponse = await postTestCase(
        buildTestCasePayload({ projectId }),
        authHeaders
      );

      createdTestCase = createResponse.body;
    });

    it("deve remover um caso de teste existente com token válido", async () => {
      const response = await deleteTestCase(createdTestCase.id, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.include("application/json");
    });

    it("deve retornar mensagem de sucesso ao remover um caso de teste", async () => {
      const response = await deleteTestCase(createdTestCase.id, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({
        message: "Test case deleted successfully",
      });
    });

    it("deve garantir que o caso de teste removido não aparece mais em GET /test-cases", async () => {
      const deleteResponse = await deleteTestCase(createdTestCase.id, authHeaders);
      const listResponse = await getTestCases(authHeaders);

      expect(deleteResponse.status).to.equal(200);
      expect(listResponse.status).to.equal(200);
      expect(listResponse.body.some((testCase) => testCase.id === createdTestCase.id)).to.equal(
        false
      );
    });

    it("deve impedir que o caso de teste removido seja usado em POST /test-runs", async () => {
      const deleteResponse = await deleteTestCase(createdTestCase.id, authHeaders);
      const createTestRunResponse = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [createdTestCase.id] }),
        authHeaders
      );

      expect(deleteResponse.status).to.equal(200);
      expect(createTestRunResponse.status).to.equal(404);
      expect(createTestRunResponse.body).to.deep.equal({
        message: "Test case not found",
      });
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await deleteTestCase(createdTestCase.id);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await deleteTestCase(createdTestCase.id, {
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar 404 quando o testCaseId não existir", async () => {
      const response = await deleteTestCase("non-existent-test-case-id", authHeaders);

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Test case not found",
      });
    });

    it("deve não alterar projetos existentes após remover um caso de teste", async () => {
      const secondProjectResponse = await postProject(buildProjectPayload(), authHeaders);

      const deleteResponse = await deleteTestCase(createdTestCase.id, authHeaders);

      expect(deleteResponse.status).to.equal(200);
      expect(secondProjectResponse.status).to.equal(201);
      expect(secondProjectResponse.body).to.include({
        id: secondProjectResponse.body.id,
        name: secondProjectResponse.body.name,
      });
    });

    it("deve não alterar test runs já existentes após remover um caso de teste", async () => {
      const createdTestRunResponse = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [createdTestCase.id] }),
        authHeaders
      );

      const deleteResponse = await deleteTestCase(createdTestCase.id, authHeaders);
      const listTestRunsResponse = await getTestRuns(authHeaders);

      expect(createdTestRunResponse.status).to.equal(201);
      expect(deleteResponse.status).to.equal(200);
      expect(listTestRunsResponse.status).to.equal(200);
      expect(
        listTestRunsResponse.body.some((testRun) => testRun.id === createdTestRunResponse.body.id)
      ).to.equal(true);
    });

    it("deve não alterar bugs já existentes após remover um caso de teste", async () => {
      const createdTestRunResponse = await postTestRun(
        buildTestRunPayload({ projectId, testCaseIds: [createdTestCase.id] }),
        authHeaders
      );
      const createdBugResponse = await postBug(
        buildBugPayload({
          testRunId: createdTestRunResponse.body.id,
          testCaseId: createdTestCase.id,
        }),
        authHeaders
      );

      const deleteResponse = await deleteTestCase(createdTestCase.id, authHeaders);

      expect(createdTestRunResponse.status).to.equal(201);
      expect(createdBugResponse.status).to.equal(201);
      expect(deleteResponse.status).to.equal(200);
      expect(createdBugResponse.body).to.include({
        id: createdBugResponse.body.id,
        testCaseId: createdTestCase.id,
        testRunId: createdTestRunResponse.body.id,
      });
    });
  });
});
