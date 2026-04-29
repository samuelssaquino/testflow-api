const { expect } = require("chai");

const { buildProjectPayload } = require("../fixtures/projects.fixture");
const {
  createAuthenticatedHeaders,
  getProjectById,
  getProjects,
  patchProject,
  postProject,
} = require("../helpers/projects.helper");

describe("Módulo Projects", () => {
  let authHeaders;

  before(async () => {
    authHeaders = await createAuthenticatedHeaders();
  });

  describe("POST /projects", () => {
    let payload;

    beforeEach(() => {
      payload = buildProjectPayload();
    });

    it("deve criar um projeto com dados válidos e token válido", async () => {
      const response = await postProject(payload, authHeaders);

      expect(response.status).to.equal(201);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.include({
        name: payload.name,
        description: payload.description,
        status: payload.status,
      });
      expect(response.body).to.have.property("id").that.is.a("string").and.is.not.empty;
      expect(response.body).to.have.property("createdAt").that.is.a("string");
      expect(response.body).to.have.property("updatedAt").that.is.a("string");
    });

    it("deve usar active como status padrão quando status não for enviado", async () => {
      const response = await postProject(
        buildProjectPayload({ status: undefined }),
        authHeaders
      );

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("status", "active");
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await postProject(payload);

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await postProject(payload, {
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar 400 quando name não for enviado", async () => {
      const invalidPayload = buildProjectPayload();

      delete invalidPayload.name;

      const response = await postProject(invalidPayload, authHeaders);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Project name is required",
      });
    });

    it("deve retornar 400 quando name tiver menos de 3 caracteres", async () => {
      const response = await postProject(
        buildProjectPayload({ name: "AB" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Project name must be at least 3 characters long",
      });
    });

    it("deve retornar 400 quando status for inválido", async () => {
      const response = await postProject(
        buildProjectPayload({ status: "inactive" }),
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Status must be either active or archived",
      });
    });

    it("deve retornar 409 quando já existir projeto com o mesmo name", async () => {
      const duplicatePayload = buildProjectPayload();

      await postProject(duplicatePayload, authHeaders);
      const response = await postProject(duplicatePayload, authHeaders);

      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal({
        message: "Project name already exists",
      });
    });

    it("não deve retornar dados sensíveis", async () => {
      const response = await postProject(payload, authHeaders);

      expect(response.status).to.equal(201);
      expect(response.body).to.not.have.property("password");
      expect(response.body).to.not.have.property("token");
      expect(response.body).to.have.all.keys(
        "id",
        "name",
        "description",
        "status",
        "createdAt",
        "updatedAt"
      );
    });
  });

  describe("GET /projects", () => {
    it("deve listar projetos com token válido", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await getProjects(authHeaders);

      expect(createdProject.status).to.equal(201);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.some((project) => project.id === createdProject.body.id)).to.equal(true);
    });

    it("deve retornar um array", async () => {
      const response = await getProjects(authHeaders);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await getProjects();

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await getProjects({
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });
  });

  describe("GET /projects/{projectId}", () => {
    it("deve buscar um projeto existente por id com token válido", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await getProjectById(createdProject.body.id, authHeaders);

      expect(createdProject.status).to.equal(201);
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(createdProject.body);
    });

    it("deve retornar 404 para projectId inexistente", async () => {
      const response = await getProjectById("non-existent-project-id", authHeaders);

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Project not found",
      });
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const response = await getProjectById("any-project-id");

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const response = await getProjectById("any-project-id", {
        Authorization: "Bearer invalid-token",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });
  });

  describe("PATCH /projects/{projectId}", () => {
    it("deve atualizar parcialmente um projeto com dados válidos e token válido", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const updatePayload = {
        name: `${createdProject.body.name} Updated`,
        description: "Updated automated project description",
        status: "archived",
      };

      const response = await patchProject(createdProject.body.id, updatePayload, authHeaders);

      expect(response.status).to.equal(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.include(updatePayload);
      expect(response.body).to.have.property("id", createdProject.body.id);
      expect(response.body).to.have.property("createdAt", createdProject.body.createdAt);
      expect(response.body).to.have.property("updatedAt").that.is.a("string");
    });

    it("deve atualizar apenas o name", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { name: `${createdProject.body.name} Renamed` },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.include({
        name: `${createdProject.body.name} Renamed`,
        description: createdProject.body.description,
        status: createdProject.body.status,
      });
    });

    it("deve atualizar apenas a description", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { description: "Updated description only" },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.include({
        name: createdProject.body.name,
        description: "Updated description only",
        status: createdProject.body.status,
      });
    });

    it("deve atualizar apenas o status", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { status: "archived" },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.include({
        name: createdProject.body.name,
        description: createdProject.body.description,
        status: "archived",
      });
    });

    it("deve atualizar o campo updatedAt", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { description: "Updated description for timestamp validation" },
        authHeaders
      );

      expect(response.status).to.equal(200);
      expect(Date.parse(response.body.updatedAt)).to.be.greaterThanOrEqual(
        Date.parse(createdProject.body.updatedAt)
      );
    });

    it("deve retornar 401 quando o token não for enviado", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(createdProject.body.id, {
        description: "Any description",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Authorization token is required",
      });
    });

    it("deve retornar 401 quando o token for inválido", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { description: "Any description" },
        {
          Authorization: "Bearer invalid-token",
        }
      );

      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({
        message: "Invalid token",
      });
    });

    it("deve retornar 404 quando o projectId não existir", async () => {
      const response = await patchProject(
        "non-existent-project-id",
        { description: "Any description" },
        authHeaders
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({
        message: "Project not found",
      });
    });

    it("deve retornar 400 quando name tiver menos de 3 caracteres", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { name: "AB" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Project name must be at least 3 characters long",
      });
    });

    it("deve retornar 400 quando status for inválido", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { status: "inactive" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "Status must be either active or archived",
      });
    });

    it("deve retornar 400 quando tentar alterar id", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { id: "new-id" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "id cannot be updated",
      });
    });

    it("deve retornar 400 quando tentar alterar createdAt", async () => {
      const createdProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        createdProject.body.id,
        { createdAt: "2026-01-01T00:00:00.000Z" },
        authHeaders
      );

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        message: "createdAt cannot be updated",
      });
    });

    it("deve retornar 409 quando tentar atualizar para um name já existente em outro projeto", async () => {
      const firstProject = await postProject(buildProjectPayload(), authHeaders);
      const secondProject = await postProject(buildProjectPayload(), authHeaders);
      const response = await patchProject(
        secondProject.body.id,
        { name: firstProject.body.name },
        authHeaders
      );

      expect(response.status).to.equal(409);
      expect(response.body).to.deep.equal({
        message: "Project name already exists",
      });
    });
  });
});
