const express = require("express");

const projectsController = require("../controllers/projectsController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /projects:
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
router.post("/projects", authenticateToken, projectsController.createProject);

module.exports = router;
