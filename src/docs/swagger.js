const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TestFlow API",
      version: "1.0.0",
      description: "API REST para gestão de testes de software",
    },
    tags: [
      {
        name: "Auth",
        description: "Autenticação",
      },
      {
        name: "Projects",
        description: "Gerenciamento de projetos",
      },
      {
        name: "Test Cases",
        description: "Gerenciamento de casos de teste",
      },
      {
        name: "Test Runs",
        description: "Gerenciamento de execuções de teste",
      },
      {
        name: "Bugs",
        description: "Gerenciamento de bugs",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        CreateProjectInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              minLength: 3,
              example: "Website QA Project",
            },
            description: {
              type: "string",
              example: "Test project for website regression testing",
            },
            status: {
              type: "string",
              enum: ["active", "archived"],
              default: "active",
              example: "active",
            },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            name: {
              type: "string",
              example: "Website QA Project",
            },
            description: {
              type: "string",
              example: "Test project for website regression testing",
            },
            status: {
              type: "string",
              enum: ["active", "archived"],
              example: "active",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-25T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-25T10:00:00.000Z",
            },
          },
        },
        CreateTestCaseInput: {
          type: "object",
          required: [
            "projectId",
            "title",
            "steps",
            "expectedResult",
            "priority",
          ],
          properties: {
            projectId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              minLength: 3,
              example: "Validar login com credenciais validas",
            },
            description: {
              type: "string",
              example: "Caso de teste para autenticar usuario com dados corretos",
            },
            preconditions: {
              type: "string",
              example: "Usuario cadastrado e ativo",
            },
            steps: {
              type: "array",
              minItems: 1,
              items: {
                type: "string",
              },
              example: [
                "Acessar a tela de login",
                "Informar usuario e senha validos",
                "Clicar no botao de login",
              ],
            },
            expectedResult: {
              type: "string",
              example: "O sistema deve autenticar o usuario com sucesso",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
              example: "high",
            },
            status: {
              type: "string",
              enum: ["draft", "ready", "deprecated"],
              default: "draft",
              example: "draft",
            },
          },
        },
        UpdateTestCaseInput: {
          type: "object",
          properties: {
            title: {
              type: "string",
              minLength: 3,
              example: "Validar login com token JWT atualizado",
            },
            description: {
              type: "string",
              example: "Descricao atualizada do caso de teste",
            },
            preconditions: {
              type: "string",
              example: "Usuario cadastrado, ativo e com permissao de acesso",
            },
            steps: {
              type: "array",
              minItems: 1,
              items: {
                type: "string",
              },
              example: [
                "Acessar a tela de login",
                "Preencher credenciais validas",
                "Validar o retorno do token",
              ],
            },
            expectedResult: {
              type: "string",
              example: "O sistema deve retornar autenticacao valida e token JWT",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
              example: "critical",
            },
            status: {
              type: "string",
              enum: ["draft", "ready", "deprecated"],
              example: "ready",
            },
          },
        },
        TestCase: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "c4b7d7b7-7c76-48bc-a70f-f6d565e3c65e",
            },
            projectId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              example: "Validar login com credenciais validas",
            },
            description: {
              type: "string",
              example: "Caso de teste para autenticar usuario com dados corretos",
            },
            preconditions: {
              type: "string",
              example: "Usuario cadastrado e ativo",
            },
            steps: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                "Acessar a tela de login",
                "Informar usuario e senha validos",
                "Clicar no botao de login",
              ],
            },
            expectedResult: {
              type: "string",
              example: "O sistema deve autenticar o usuario com sucesso",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
              example: "high",
            },
            status: {
              type: "string",
              enum: ["draft", "ready", "deprecated"],
              example: "draft",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-26T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-26T10:00:00.000Z",
            },
          },
        },
        CreateTestRunInput: {
          type: "object",
          required: ["projectId", "title", "testCaseIds", "executedBy"],
          properties: {
            projectId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              minLength: 3,
              example: "Execucao de regressao sprint 5",
            },
            description: {
              type: "string",
              example: "Execucao principal de regressao da sprint",
            },
            testCaseIds: {
              type: "array",
              minItems: 1,
              items: {
                type: "string",
                format: "uuid",
              },
              example: ["c4b7d7b7-7c76-48bc-a70f-f6d565e3c65e"],
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
              default: "pending",
              example: "pending",
            },
            executedBy: {
              type: "string",
              example: "samuel.aquino",
            },
            startedAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-26T10:00:00.000Z",
            },
            finishedAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-26T11:30:00.000Z",
            },
          },
        },
        TestRun: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "af31ac17-f512-4d4f-8fe8-7579e98730ac",
            },
            projectId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              example: "Execucao de regressao sprint 5",
            },
            description: {
              type: "string",
              example: "Execucao principal de regressao da sprint",
            },
            testCaseIds: {
              type: "array",
              items: {
                type: "string",
                format: "uuid",
              },
              example: ["c4b7d7b7-7c76-48bc-a70f-f6d565e3c65e"],
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
              example: "pending",
            },
            executedBy: {
              type: "string",
              example: "samuel.aquino",
            },
            startedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: "2026-04-26T10:00:00.000Z",
            },
            finishedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: "2026-04-26T11:30:00.000Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-26T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-26T10:00:00.000Z",
            },
          },
        },
        CreateBugInput: {
          type: "object",
          required: [
            "testRunId",
            "testCaseId",
            "title",
            "description",
            "severity",
            "priority",
          ],
          properties: {
            testRunId: {
              type: "string",
              format: "uuid",
              example: "af31ac17-f512-4d4f-8fe8-7579e98730ac",
            },
            testCaseId: {
              type: "string",
              format: "uuid",
              example: "c4b7d7b7-7c76-48bc-a70f-f6d565e3c65e",
            },
            title: {
              type: "string",
              minLength: 3,
              example: "Erro ao autenticar usuario com credenciais validas",
            },
            description: {
              type: "string",
              example: "O sistema apresentou falha 500 ao enviar o formulario",
            },
            severity: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
              example: "high",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
              example: "critical",
            },
            status: {
              type: "string",
              enum: ["open", "in_progress", "resolved", "closed"],
              default: "open",
              example: "open",
            },
            evidence: {
              type: "string",
              example: "https://example.com/evidencia.png",
            },
            stepsToReproduce: {
              type: "string",
              example: "Acessar login, preencher dados validos e clicar em entrar",
            },
          },
        },
        Bug: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "8910e77f-b923-4af0-a0d7-d1db2f9080b5",
            },
            testRunId: {
              type: "string",
              format: "uuid",
              example: "af31ac17-f512-4d4f-8fe8-7579e98730ac",
            },
            testCaseId: {
              type: "string",
              format: "uuid",
              example: "c4b7d7b7-7c76-48bc-a70f-f6d565e3c65e",
            },
            title: {
              type: "string",
              example: "Erro ao autenticar usuario com credenciais validas",
            },
            description: {
              type: "string",
              example: "O sistema apresentou falha 500 ao enviar o formulario",
            },
            severity: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
              example: "high",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
              example: "critical",
            },
            status: {
              type: "string",
              enum: ["open", "in_progress", "resolved", "closed"],
              example: "open",
            },
            evidence: {
              type: "string",
              example: "https://example.com/evidencia.png",
            },
            stepsToReproduce: {
              type: "string",
              example: "Acessar login, preencher dados validos e clicar em entrar",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-26T16:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-26T16:30:00.000Z",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Invalid token",
            },
          },
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
