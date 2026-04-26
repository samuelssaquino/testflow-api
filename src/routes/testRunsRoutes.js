const express = require("express");

const testRunsController = require("../controllers/testRunsController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /test-runs:
 *   post:
 *     summary: Cria uma nova execução de testes
 *     tags:
 *       - Test Runs
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTestRunInput'
 *           examples:
 *             default:
 *               value:
 *                 projectId: 550e8400-e29b-41d4-a716-446655440000
 *                 title: Execucao de regressao sprint 5
 *                 description: Execucao principal de regressao da sprint
 *                 testCaseIds:
 *                   - c4b7d7b7-7c76-48bc-a70f-f6d565e3c65e
 *                 status: pending
 *                 executedBy: samuel.aquino
 *                 startedAt: 2026-04-26T10:00:00.000Z
 *                 finishedAt: 2026-04-26T11:30:00.000Z
 *     responses:
 *       201:
 *         description: Execução criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestRun'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Projeto ou caso de teste não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Execução duplicada no mesmo projeto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     summary: Lista todas as execuções de teste
 *     tags:
 *       - Test Runs
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de execuções retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TestRun'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/test-runs", authenticateToken, testRunsController.createTestRun);
router.get("/test-runs", authenticateToken, testRunsController.listTestRuns);

module.exports = router;
