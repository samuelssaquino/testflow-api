const express = require("express");

const reportsController = require("../controllers/reportsController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /reports/execution-summary:
 *   get:
 *     summary: Retorna um resumo consolidado das execucoes de teste
 *     tags:
 *       - Reports
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Resumo de execucao gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExecutionSummaryReport'
 *             examples:
 *               default:
 *                 value:
 *                   totalProjects: 2
 *                   totalTestCases: 5
 *                   totalTestRuns: 3
 *                   totalBugs: 4
 *                   testCasesByStatus:
 *                     draft: 2
 *                     ready: 3
 *                     deprecated: 0
 *                   testRunsByStatus:
 *                     pending: 1
 *                     in_progress: 1
 *                     completed: 1
 *                   bugsByStatus:
 *                     open: 2
 *                     in_progress: 1
 *                     resolved: 1
 *                     closed: 0
 *                   bugsBySeverity:
 *                     low: 0
 *                     medium: 1
 *                     high: 2
 *                     critical: 1
 *                   bugsByPriority:
 *                     low: 0
 *                     medium: 1
 *                     high: 2
 *                     critical: 1
 *       401:
 *         description: Token ausente ou invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingToken:
 *                 value:
 *                   message: Authorization token is required
 *               invalidToken:
 *                 value:
 *                   message: Invalid token
 */
router.get(
  "/reports/execution-summary",
  authenticateToken,
  reportsController.getExecutionSummary
);

module.exports = router;
