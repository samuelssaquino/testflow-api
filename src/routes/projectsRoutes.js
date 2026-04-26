const express = require("express");

const projectsController = require("../controllers/projectsController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lista todos os projetos
 *     tags:
 *       - Projects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
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
 *   post:
 *     summary: Cria um novo projeto
 *     tags:
 *       - Projects
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectInput'
 *           examples:
 *             default:
 *               value:
 *                 name: Website QA Project
 *                 description: Test project for website regression testing
 *                 status: active
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Dados invalidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidName:
 *                 value:
 *                   message: Project name must be at least 3 characters long
 *               invalidStatus:
 *                 value:
 *                   message: Status must be either active or archived
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
 *       409:
 *         description: Projeto com nome ja existente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               duplicateName:
 *                 value:
 *                   message: Project name already exists
 */
router.get("/projects", authenticateToken, projectsController.listProjects);
router.post("/projects", authenticateToken, projectsController.createProject);

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Busca um projeto pelo id
 *     tags:
 *       - Projects
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador unico do projeto
 *     responses:
 *       200:
 *         description: Projeto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
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
 *       404:
 *         description: Projeto nao encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               notFound:
 *                 value:
 *                   message: Project not found
 */
router.get(
  "/projects/:projectId",
  authenticateToken,
  projectsController.getProjectById
);

module.exports = router;
