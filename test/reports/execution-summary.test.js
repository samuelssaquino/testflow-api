const { expect } = require("chai");

const { buildBugPayload } = require("../fixtures/bugs.fixture");
const { buildProjectPayload } = require("../fixtures/projects.fixture");
const { buildTestCasePayload } = require("../fixtures/test-cases.fixture");
const { buildTestRunPayload } = require("../fixtures/test-runs.fixture");
const {
  createAuthenticatedHeaders,
  createIsolatedRequester,
  getExecutionSummary,
  postBug,
  postProject,
  postTestCase,
  postTestRun,
} = require("../helpers/reports.helper");

describe("Módulo Reports", () => {
  let requester;
  let authHeaders;

  const buildEmptySummary = () => ({
    totalProjects: 0,
    totalTestCases: 0,
    totalTestRuns: 0,
    totalBugs: 0,
    testCasesByStatus: {
      draft: 0,
      ready: 0,
      deprecated: 0,
    },
    testRunsByStatus: {
      pending: 0,
      in_progress: 0,
      completed: 0,
    },
    bugsByStatus: {
      open: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0,
    },
    bugsBySeverity: {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    },
    bugsByPriority: {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    },
  });

  const createSupportData = async () => {
    const firstProjectResponse = await postProject(
      requester,
      buildProjectPayload(),
      authHeaders
    );
    const secondProjectResponse = await postProject(
      requester,
      buildProjectPayload(),
      authHeaders
    );

    const firstProjectId = firstProjectResponse.body.id;

    const draftTestCaseResponse = await postTestCase(
      requester,
      buildTestCasePayload({
        projectId: firstProjectId,
        status: "draft",
      }),
      authHeaders
    );
    const readyTestCaseResponse = await postTestCase(
      requester,
      buildTestCasePayload({
        projectId: firstProjectId,
        status: "ready",
      }),
      authHeaders
    );
    const deprecatedTestCaseResponse = await postTestCase(
      requester,
      buildTestCasePayload({
        projectId: firstProjectId,
        status: "deprecated",
      }),
      authHeaders
    );

    const pendingTestRunResponse = await postTestRun(
      requester,
      buildTestRunPayload({
        projectId: firstProjectId,
        testCaseIds: [draftTestCaseResponse.body.id],
        status: "pending",
      }),
      authHeaders
    );
    const inProgressTestRunResponse = await postTestRun(
      requester,
      buildTestRunPayload({
        projectId: firstProjectId,
        testCaseIds: [readyTestCaseResponse.body.id],
        status: "in_progress",
      }),
      authHeaders
    );
    const completedTestRunResponse = await postTestRun(
      requester,
      buildTestRunPayload({
        projectId: firstProjectId,
        testCaseIds: [deprecatedTestCaseResponse.body.id],
        status: "completed",
      }),
      authHeaders
    );

    await postBug(
      requester,
      buildBugPayload({
        testRunId: pendingTestRunResponse.body.id,
        testCaseId: draftTestCaseResponse.body.id,
        status: "open",
        severity: "low",
        priority: "medium",
      }),
      authHeaders
    );
    await postBug(
      requester,
      buildBugPayload({
        testRunId: inProgressTestRunResponse.body.id,
        testCaseId: readyTestCaseResponse.body.id,
        status: "in_progress",
        severity: "medium",
        priority: "high",
      }),
      authHeaders
    );
    await postBug(
      requester,
      buildBugPayload({
        testRunId: completedTestRunResponse.body.id,
        testCaseId: deprecatedTestCaseResponse.body.id,
        status: "resolved",
        severity: "high",
        priority: "critical",
      }),
      authHeaders
    );
    await postBug(
      requester,
      buildBugPayload({
        testRunId: completedTestRunResponse.body.id,
        testCaseId: deprecatedTestCaseResponse.body.id,
        status: "closed",
        severity: "critical",
        priority: "low",
      }),
      authHeaders
    );

    return {
      firstProjectId,
      secondProjectId: secondProjectResponse.body.id,
    };
  };

  beforeEach(async () => {
    requester = createIsolatedRequester();
    authHeaders = await createAuthenticatedHeaders(requester);
  });

  describe("GET /reports/execution-summary", () => {
    it("deve retornar resumo de execução com token válido", async () => {
      const response = await getExecutionSummary(requester, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.deep.equal(buildEmptySummary());
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await getExecutionSummary(requester);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await getExecutionSummary(requester, {
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar as métricas principais no corpo da resposta", async () => {
      await createSupportData();

      const response = await getExecutionSummary(requester, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.include({
        totalProjects: 2,
        totalTestCases: 3,
        totalTestRuns: 3,
        totalBugs: 4,
      });
    });

    it("deve retornar os agrupamentos por status de casos de teste", async () => {
      await createSupportData();

      const response = await getExecutionSummary(requester, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("testCasesByStatus").that.deep.equals({
        draft: 1,
        ready: 1,
        deprecated: 1,
      });
    });

    it("deve retornar os agrupamentos por status de execuções", async () => {
      await createSupportData();

      const response = await getExecutionSummary(requester, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("testRunsByStatus").that.deep.equals({
        pending: 1,
        in_progress: 1,
        completed: 1,
      });
    });

    it("deve retornar os agrupamentos por status de bugs", async () => {
      await createSupportData();

      const response = await getExecutionSummary(requester, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("bugsByStatus").that.deep.equals({
        open: 1,
        in_progress: 1,
        resolved: 1,
        closed: 1,
      });
    });

    it("deve retornar os agrupamentos por severidade dos bugs", async () => {
      await createSupportData();

      const response = await getExecutionSummary(requester, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("bugsBySeverity").that.deep.equals({
        low: 1,
        medium: 1,
        high: 1,
        critical: 1,
      });
    });

    it("deve retornar os agrupamentos por prioridade dos bugs", async () => {
      await createSupportData();

      const response = await getExecutionSummary(requester, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("bugsByPriority").that.deep.equals({
        low: 1,
        medium: 1,
        high: 1,
        critical: 1,
      });
    });

    it("deve retornar métricas numéricas", async () => {
      await createSupportData();

      const response = await getExecutionSummary(requester, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body.totalProjects).to.be.a("number");
      expect(response.body.totalTestCases).to.be.a("number");
      expect(response.body.totalTestRuns).to.be.a("number");
      expect(response.body.totalBugs).to.be.a("number");
    });

    it("deve não alterar dados existentes ao consultar o relatório", async () => {
      await createSupportData();

      const firstResponse = await getExecutionSummary(requester, authHeaders);
      const secondResponse = await getExecutionSummary(requester, authHeaders);

      expect(firstResponse.status).to.equal(200);
      expect(secondResponse.status).to.equal(200);
      expect(secondResponse.body).to.deep.equal(firstResponse.body);
    });
  });
});
