import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

// Middleware pour parser les requêtes en JSON
app.use(bodyParser.json());

// Middleware pour autoriser les requêtes depuis des domaines différents
app.use(cors());

// Middleware pour sécuriser l'application
app.use(helmet());

// Middleware pour logger les requêtes
app.use(morgan('combined'));

// Options de configuration de Swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API utilisateur',
      version: '1.0.0',
      description: 'API pour gérer les utilisateurs',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
  },
  apis: ['**/*.ts'],
};

// Initialisation de Swagger-jsdoc
const specs = swaggerJsdoc(options);

// Middleware pour afficher la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     FirstName:
 *       type: string
 *       description: Firstname of the user
 *       example: John
 *     LastName:
 *       type: string
 *       description: Lastname of the user
 *       example: Doe
 *     Email:
 *       type: string
 *       description: Email of the user
 *       example: john.doe@example.com
 *     Password:
 *       type: string
 *       description: Password of the user
 *       example: password123
 *     Id:
 *       type: integer
 *       format: int32
 *       description: Unique identifier of the user
 *       example: 1
 *     Role:
 *       type: string
 *       description: Le rôle de l'utilisateur
 *       example: admin
 * 
 *     UserRegistration:
 *       type: object
 *       required: [first_name, last_name, email, password]
 *       properties:
 *         first_name:
 *           $ref: '#/components/schemas/FirstName'
 *         last_name:
 *           $ref: '#/components/schemas/LastName'
 *         email:
 *           $ref: '#/components/schemas/Email'
 *         password:
 *           $ref: '#/components/schemas/Password'
 *     UserInformation:
 *       type: object
 *       required: [first_name, last_name, email]
 *       properties:
 *         first_name:
 *           $ref: '#/components/schemas/FirstName'
 *         last_name:
 *           $ref: '#/components/schemas/LastName'
 *         email:
 *           $ref: '#/components/schemas/Email'
 *     UserLogin:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           $ref: '#/components/schemas/Email'
 *         password:
 *           $ref: '#/components/schemas/Password'
 *     UserPatch:
 *       type: object
 *       properties:
 *         first_name:
 *           $ref: '#/components/schemas/FirstName'
 *         last_name:
 *           $ref: '#/components/schemas/LastName'
 *         email:
 *           $ref: '#/components/schemas/Email'
 *         password:
 *           $ref: '#/components/schemas/Password'
 *     UserWithId:
 *       type: object
 *       required: [id, first_name, last_name, email]
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/Id'
 *         first_name:
 *           $ref: '#/components/schemas/FirstName'
 *         last_name:
 *           $ref: '#/components/schemas/LastName'
 *         email:
 *           $ref: '#/components/schemas/Email'
 *     UserWithRole:
 *       type: object
 *       required: [id, role]
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/Id'
 *         role:
 *           $ref: '#/components/schemas/Role'
 */

/**
 * @swagger
 * /auth/register:
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
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInformation'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 */
app.post('/auth/register', (req, res) => {
  // Code pour créer un nouvel utilisateur
});

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
 *             $ref: '#/components/schemas/UserLogin'
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
app.post('/auth/login', (req, res) => {
  // Code pour l'authentification de l'utilisateur
});

/**
 * @swagger
 * /users/me:
 *   get:
 *    summary: Obtenir les informations de l'utilisateur connecté
 *    description: Obtient les informations de l'utilisateur connecté
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Utilisateur connecté
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInformation'
 *      401:
 *        description: Non autorisé
 *      404:
 *        description: Utilisateur non trouvé
 *   patch:
 *     summary: Mettre à jour les informations de l'utilisateur connecté
 *     description: Met à jour les informations de l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Les informations de l'utilisateur à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPatch'
 *     responses:
 *       200:
 *         description: Les informations de l'utilisateur ont été mises à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInformation'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *   delete:
 *     summary: Supprimer l'utilisateur connecté
 *     description: Supprime l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
app.route('/users/me')
  .get((req, res) => {
    // Code pour obtenir les informations de l'utilisateur connecté
  })
  .patch((req, res) => {
    // Code pour mettre à jour les informations de l'utilisateur connecté
  })
  .delete((req, res) => {
    // Code pour supprimer l'utilisateur connecté
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
 *       - adminRole: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserWithId'
 *       401:
 *         description: Non autorisé
 */
app.get('/users', (req, res) => {
  // Code pour obtenir la liste des utilisateurs
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
 *       - adminRole: []
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
 *               $ref: '#/components/schemas/UserWithId'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur introuvable
 *   patch:
 *     summary: Mettre à jour les informations d'un utilisateur
 *     description: Mettre à jour les informations d'un utilisateur en fonction de son ID
 *     security:
 *       - bearerAuth: []
 *       - adminRole: []
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
 *             $ref: '#/components/schemas/UserPatch'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithId'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur introuvable
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur en fonction de son ID
 *     security:
 *       - bearerAuth: []
 *       - adminRole: []
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
app.route('/users/:userId')
  .get((req, res) => {
    // Code pour obtenir les informations d'un utilisateur
  })
  .patch((req, res) => {
    // Code pour mettre à jour les informations d'un utilisateur
  })
  .delete((req, res) => {
    // Code pour supprimer un utilisateur
  });

/**
 * @swagger
 * /users/role:
 *   get:
 *     summary: Obtenir la liste des rôles d'utilisateurs
 *     description: Obtient la liste de tous les rôles d'utilisateurs dans la base de données
 *     security:
 *       - bearerAuth: []
 *       - adminRole: []
 *     responses:
 *       200:
 *         description: Liste des rôles d'utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *       401:
 *         description: Non autorisé
 */
app.get('/users/role', (req, res) => {
  // Code pour obtenir la liste des rôles d'utilisateurs
});

/**
 * @swagger
 * /users/{userId}/role:
 *   get:
 *     summary: Obtenir le rôle d'un utilisateur
 *     description: Obtient le rôle d'un utilisateur en fonction de son ID
 *     security:
 *       - bearerAuth: []
 *       - adminRole: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rôle de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithRole'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur introuvable
 *   put:
 *     summary: Mettre à jour le rôle d'un utilisateur
 *     description: Met à jour le rôle d'un utilisateur en fonction de son ID
 *     security:
 *       - bearerAuth: []
 *       - adminRole: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Rôle de l'utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithRole'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur introuvable
 */
app.route('/users/:userId/role')
  .get((req, res) => {
    // Code pour obtenir le rôle d'un utilisateur
  })
  .put((req, res) => {
    // Code pour mettre à jour le rôle d'un utilisateur
  });

// Port d'écoute de l'application
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Service User démarré sur le port ${port}`);
});