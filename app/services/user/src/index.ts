import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

export const app = express();
export const api = express.Router();
app.use("/api", api);

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json());

// Middleware pour autoriser les requêtes depuis des domaines différents
app.use(cors());

// Middleware pour sécuriser l'application
app.use(helmet());

// Middleware pour logger les requêtes
app.use(morgan("combined"));

// Options de configuration de Swagger
const options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "API utilisateur",
			version: "1.0.0",
			description: "API pour gérer les utilisateurs",
		},
		servers: [
			{
				url: "http://localhost:3000",
				description: "Serveur local",
			},
		],
	},
	apis: ["**/*.ts"],
};

// Initialisation de Swagger-jsdoc
const specs = swaggerJsdoc(options);

// Middleware pour afficher la documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Route de l'application pour l'authentification
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentification d'un utilisateur
 *     description: Authentification d'un utilisateur avec son email et son mot de passe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       401:
 *         description: Échec d'authentification
 */
api.post("/auth/login", (req, res) => {
	// Code pour l'authentification de l'utilisateur
	res.status(501).send("Not implemented");
});

// Route de l'application pour obtenir la liste des utilisateurs
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtenir la liste des utilisateurs
 *     description: Obtient la liste de tous les utilisateurs dans la base de données
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé
 */
api.get("/users", (req, res) => {
	// Code pour obtenir la liste des utilisateurs
	res.status(501).send("Not implemented");
});

// Route de l'application pour obtenir les informations d'un utilisateur
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Obtenir les informations d'un utilisateur
 *     description: Obtient les informations d'un utilisateur en fonction de son ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur introuvable
 */
api.get("/users/:userId", (req, res) => {
	// Code pour obtenir les informations d'un utilisateur
	res.status(501).send("Not implemented");
});

// Route de l'application pour créer un utilisateur
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Créer un nouvel utilisateur dans la base de données
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 */
api.post("/users", (req, res) => {
	// Code pour créer un nouvel utilisateur
	res.status(501).send("Not implemented");
});

// Route de l'application pour mettre à jour un utilisateur
/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Mettre à jour les informations d'un utilisateur
 *     description: Mettre à jour les informations d'un utilisateur en fonction de son ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur introuvable
 */
api.put("/users/:userId", (req, res) => {
	// Code pour mettre à jour les informations d'un utilisateur
	res.status(501).send("Not implemented");
});

// Route de l'application pour supprimer un utilisateur
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur en fonction de son ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur introuvable
 */
api.delete("/users/:userId", (req, res) => {
	// Code pour supprimer un utilisateur
	res.status(501).send("Not implemented");
});

// Définition des composants de l'API pour Swagger
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           example: password123
 *         isAdmin:
 *           type: boolean
 *           example: false
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         isAdmin:
 *           type: boolean
 *           example: false
 */
// Fin de la définition des composants de l'API pour Swagger

// Port d'écoute de l'application
const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
	console.log(`Service User démarré sur le port ${port}`);
});
