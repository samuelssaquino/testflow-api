const express = require("express");

const testCasesController = require("../controllers/testCasesController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /test-cases:
 *   post:
 *     summary: Cria um novo caso de teste
 *     tags:
 *       - Test Cases
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTestCaseInput'
 *           examples:
 *             default:
 *               value:
 *                 projectId: 550e8400-e29b-41d4-a716-446655440000
 *                 title: Validar login com credenciais validas
 *                 description: Caso de teste para autenticar usuario com dados corretos
 *                 preconditions: Usuario cadastrado e ativo
 *                 steps:
 *                   - Acessar a tela de login
 *                   - Informar usuario e senha validos
 *                   - Clicar no botao de login
 *                 expectedResult: O sistema deve autenticar o usuario com sucesso
 *                 priority: high
 *                 status: draft
 *     responses:
 *       201:
 *         description: Caso de teste criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestCase'
 *       400:
 *         description: Dados invalidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token ausente ou invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Projeto nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Caso de teste duplicado no mesmo projeto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     summary: Lista todos os casos de teste
 *     tags:
 *       - Test Cases
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos de teste retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TestCase'
 *       401:
 *         description: Token ausente ou invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/test-cases", authenticateToken, testCasesController.createTestCase);
router.get("/test-cases", authenticateToken, testCasesController.listTestCases);

/**
 * @swagger
 * /test-cases/{testCaseId}:
 *   patch:
 *     summary: Atualiza parcialmente um caso de teste
 *     tags:
 *       - Test Cases
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: testCaseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador unico do caso de teste
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTestCaseInput'
 *           examples:
 *             default:
 *               value:
 *                 title: Validar login com credenciais validas e token JWT
 *                 priority: critical
 *                 status: ready
 *     responses:
 *       200:
 *         description: Caso de teste atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestCase'
 *       400:
 *         description: Dados invalidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token ausente ou invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Caso de teste nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Caso de teste duplicado no mesmo projeto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch(
  "/test-cases/:testCaseId",
  authenticateToken,
  testCasesController.updateTestCase
);

module.exports = router;
