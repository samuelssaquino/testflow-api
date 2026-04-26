const express = require("express");

const bugsController = require("../controllers/bugsController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /bugs:
 *   post:
 *     summary: Registra um bug encontrado durante a execução de testes
 *     tags:
 *       - Bugs
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBugInput'
 *           examples:
 *             default:
 *               value:
 *                 testRunId: af31ac17-f512-4d4f-8fe8-7579e98730ac
 *                 testCaseId: c4b7d7b7-7c76-48bc-a70f-f6d565e3c65e
 *                 title: Erro ao autenticar usuario com credenciais validas
 *                 description: O sistema apresentou falha 500 ao enviar o formulario
 *                 severity: high
 *                 priority: critical
 *                 status: open
 *                 evidence: https://example.com/evidencia.png
 *                 stepsToReproduce: Acessar login, preencher dados validos e clicar em entrar
 *     responses:
 *       201:
 *         description: Bug criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bug'
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
 *         description: Execução de teste ou caso de teste não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Bug duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/bugs", authenticateToken, bugsController.createBug);

module.exports = router;
