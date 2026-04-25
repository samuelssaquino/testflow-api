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
