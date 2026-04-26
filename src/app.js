const express = require("express");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const testCasesRoutes = require("./routes/testCasesRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();
const swaggerUiOptions = {
  customCss: `
    .swagger-ui .responses-table .response-col_description,
    .swagger-ui .responses-inner,
    .swagger-ui .highlight-code {
      overflow-x: auto;
    }

    .swagger-ui .responses-table .response-col_description pre,
    .swagger-ui .responses-inner pre,
    .swagger-ui .highlight-code pre,
    .swagger-ui .microlight,
    .swagger-ui pre.microlight {
      white-space: pre-wrap !important;
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
      overflow-x: auto !important;
      padding-right: 5.5rem !important;
      box-sizing: border-box;
    }

    .swagger-ui .highlight-code {
      position: relative;
    }

    .swagger-ui .copy-to-clipboard,
    .swagger-ui .btn-copy {
      right: 0.75rem !important;
      top: 0.75rem !important;
    }
  `,
  swaggerOptions: {
    operationsSorter: (firstOperation, secondOperation) => {
      const pathOrder = {
        "/projects": 0,
        "/projects/{projectId}": 1,
        "/test-cases": 2,
        "/test-cases/{testCaseId}": 3,
      };
      const methodOrder = {
        post: 0,
        get: 1,
        put: 2,
        patch: 3,
        delete: 4,
      };
      const firstPath = firstOperation.get("path");
      const secondPath = secondOperation.get("path");
      const firstMethod = firstOperation.get("method");
      const secondMethod = secondOperation.get("method");
      const firstPathRank = pathOrder[firstPath];
      const secondPathRank = pathOrder[secondPath];

      if (
        firstPathRank !== undefined &&
        secondPathRank !== undefined &&
        firstPathRank !== secondPathRank
      ) {
        return firstPathRank - secondPathRank;
      }

      if (
        firstPathRank !== undefined &&
        secondPathRank !== undefined &&
        firstPathRank === secondPathRank
      ) {
        return methodOrder[firstMethod] - methodOrder[secondMethod];
      }

      if (firstPathRank !== undefined) {
        return -1;
      }

      if (secondPathRank !== undefined) {
        return 1;
      }

      return firstPath.localeCompare(secondPath);
    },
  },
};

app.use(express.json());

app.use("/", authRoutes);
app.use("/", projectsRoutes);
app.use("/", testCasesRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

module.exports = app;
