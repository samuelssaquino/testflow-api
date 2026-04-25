const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login e retorna um token JWT
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - password
 *             properties:
 *               user:
 *                 type: string
 *                 example: samuel.aquino
 *               password:
 *                 type: string
 *                 example: "123456"
 *           examples:
 *             success:
 *               value:
 *                 user: samuel.aquino
 *                 password: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: jwt-token-gerado
 *             examples:
 *               success:
 *                 value:
 *                   message: Login successful
 *                   token: jwt-token-gerado
 *       400:
 *         description: Dados invalidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user and password are required
 *             examples:
 *               missingFields:
 *                 value:
 *                   message: user and password are required
 *               invalidTypes:
 *                 value:
 *                   message: user and password must be strings
 *               emptyFields:
 *                 value:
 *                   message: user and password cannot be empty
 *       401:
 *         description: Credenciais invalidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *             examples:
 *               invalidCredentials:
 *                 value:
 *                   message: Invalid credentials
 */
router.post("/login", authController.login);

module.exports = router;
