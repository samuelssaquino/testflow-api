const express = require("express");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(express.json());

app.use("/", authRoutes);
app.use("/", projectsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
