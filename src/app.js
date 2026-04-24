const express = require("express");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(express.json());

app.use("/", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
