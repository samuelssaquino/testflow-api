const { expect } = require("chai");

const { buildProjectPayload } = require("../fixtures/projects.fixture");
const { buildTestCasePayload } = require("../fixtures/test-cases.fixture");
const { buildTestRunPayload } = require("../fixtures/test-runs.fixture");
const { buildBugPayload } = require("../fixtures/bugs.fixture");
const { createAuthenticatedHeaders, postProject } = require("../helpers/projects.helper");
const { postTestCase } = require("../helpers/test-cases.helper");
const { postTestRun } = require("../helpers/test-runs.helper");
const { patchBug, postBug } = require("../helpers/bugs.helper");

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

  describe("PATCH /bugs/{bugId}", () => {
    let createdBug;

    beforeEach(async () => {
      const createResponse = await postBug(
        buildBugPayload({ testRunId, testCaseId }),
        authHeaders
      );

      createdBug = createResponse.body;
    });

    it("deve atualizar parcialmente um bug com dados válidos e token válido", async () => {
      const response = await patchBug(
        createdBug.id,
        {
          title: `${createdBug.title} atualizado`,
          description: "Descricao atualizada do bug",
          severity: "medium",
          priority: "critical",
          status: "in_progress",
          evidence: "Video atualizado da falha",
          stepsToReproduce: "Acessar login, repetir o fluxo e observar a falha",
        },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.include({
        id: createdBug.id,
        testRunId: createdBug.testRunId,
        testCaseId: createdBug.testCaseId,
        title: `${createdBug.title} atualizado`,
        description: "Descricao atualizada do bug",
        severity: "medium",
        priority: "critical",
        status: "in_progress",
        evidence: "Video atualizado da falha",
        stepsToReproduce: "Acessar login, repetir o fluxo e observar a falha",
      });
      expect(response.body).to.have.property("createdAt", createdBug.createdAt);
      expect(response.body).to.have.property("updatedAt").that.is.a("string");
    });

    it("deve atualizar apenas o title", async () => {
      const response = await patchBug(
        createdBug.id,
        { title: `${createdBug.title} renomeado` },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("title", `${createdBug.title} renomeado`);
      expect(response.body).to.have.property("description", createdBug.description);
    });

    it("deve atualizar apenas a description", async () => {
      const response = await patchBug(
        createdBug.id,
        { description: "Descricao ajustada para reproduzir o defeito" },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        "description",
        "Descricao ajustada para reproduzir o defeito"
      );
      expect(response.body).to.have.property("title", createdBug.title);
    });

    it("deve atualizar apenas a severity", async () => {
      const response = await patchBug(createdBug.id, { severity: "low" }, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("severity", "low");
      expect(response.body).to.have.property("priority", createdBug.priority);
    });

    it("deve atualizar apenas a priority", async () => {
      const response = await patchBug(createdBug.id, { priority: "medium" }, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("priority", "medium");
      expect(response.body).to.have.property("severity", createdBug.severity);
    });

    it("deve atualizar apenas o status", async () => {
      const response = await patchBug(createdBug.id, { status: "resolved" }, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("status", "resolved");
      expect(response.body).to.have.property("title", createdBug.title);
    });

    it("deve atualizar evidence e stepsToReproduce", async () => {
      const response = await patchBug(
        createdBug.id,
        {
          evidence: "Imagem atualizada da falha",
          stepsToReproduce: "Abrir o formulario, preencher os dados e salvar",
        },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("evidence", "Imagem atualizada da falha");
      expect(response.body).to.have.property(
        "stepsToReproduce",
        "Abrir o formulario, preencher os dados e salvar"
      );
    });

    it("deve atualizar o campo updatedAt", async () => {
      const response = await patchBug(
        createdBug.id,
        { description: "Descricao para validar atualizacao de timestamp" },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(Date.parse(response.body.updatedAt)).to.be.greaterThanOrEqual(
        Date.parse(createdBug.updatedAt)
      );
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await patchBug(createdBug.id, { status: "resolved" });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await patchBug(
        createdBug.id,
        { status: "resolved" },
        {
          Authorization: "Bearer invalid-token",
        }
      );

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar 404 quando o bugId não existir", async () => {
      const response = await patchBug(
        "non-existent-bug-id",
        { status: "resolved" },
        authHeaders
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Bug not found",
      });
    });

    it("deve retornar 400 quando title tiver menos de 3 caracteres", async () => {
      const response = await patchBug(createdBug.id, { title: "AB" }, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Bug title must be at least 3 characters long",
      });
    });

    it("deve retornar 400 quando description estiver vazia", async () => {
      const response = await patchBug(createdBug.id, { description: "   " }, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Bug description is required",
      });
    });

    it("deve retornar 400 quando severity for inválida", async () => {
      const response = await patchBug(createdBug.id, { severity: "urgent" }, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Severity must be one of: low, medium, high, critical",
      });
    });

    it("deve retornar 400 quando priority for inválida", async () => {
      const response = await patchBug(createdBug.id, { priority: "urgent" }, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Priority must be one of: low, medium, high, critical",
      });
    });

    it("deve retornar 400 quando status for inválido", async () => {
      const response = await patchBug(createdBug.id, { status: "active" }, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Status must be one of: open, in_progress, resolved, closed",
      });
    });

    it("deve retornar 400 quando tentar alterar id", async () => {
      const response = await patchBug(createdBug.id, { id: "novo-id" }, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "id cannot be updated",
      });
    });

    it("deve retornar 400 quando tentar alterar testRunId", async () => {
      const response = await patchBug(
        createdBug.id,
        { testRunId: "novo-test-run-id" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "testRunId cannot be updated",
      });
    });

    it("deve retornar 400 quando tentar alterar testCaseId", async () => {
      const response = await patchBug(
        createdBug.id,
        { testCaseId: "novo-test-case-id" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "testCaseId cannot be updated",
      });
    });

    it("deve retornar 400 quando tentar alterar createdAt", async () => {
      const response = await patchBug(
        createdBug.id,
        { createdAt: "2026-04-29T10:00:00.000Z" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "createdAt cannot be updated",
      });
    });

    it("deve retornar 409 quando tentar atualizar para um title duplicado no mesmo testRunId e testCaseId", async () => {
      const duplicatedBugResponse = await postBug(
        buildBugPayload({ testRunId, testCaseId }),
        authHeaders
      );

      const response = await patchBug(
        createdBug.id,
        { title: duplicatedBugResponse.body.title },
        authHeaders
      );

      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal({
        message: "Bug title already exists for this test run and test case",
      });
    });
  });
});
