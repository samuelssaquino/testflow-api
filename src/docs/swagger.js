const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TestFlow API",
      version: "1.0.0",
      description: "API REST para gestao de testes de software",
    },
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
