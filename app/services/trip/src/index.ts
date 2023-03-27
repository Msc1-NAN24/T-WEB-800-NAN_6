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
      title: 'API Trip',
      version: '1.0.0',
      description: 'API pour gérer les voyages',
    },
    servers: [
      {
        url: 'http://localhost:3009',
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
 *     TripName:
 *       type: string
 *       description: Nom du voyage
 *       example: "Voyage en Italie"
 */

/**
 * @swagger
 * /trips:
 *   get:
 *     summary: Récupère la liste de tous les voyages
 *   post:
 *     summary: Crée un nouveau voyage
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description:  Données du voyage à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripName'
 */

/**
 * @swagger
 * /trips/me:
 *   get:
 *     summary: Récupère la liste des voyages de l'utilisateur connecté (avec les id)
 */

/**
 * @swagger
 * /trips/{id}:
 *   get:
 *     summary: Récupère un voyage par son id (vérification du propriétaire)
 *   patch:
 *     summary: Modifie un voyage (vérification du propriétaire et attention si il est déjà utilisé)
 *   delete:
 *     summary: Supprime un voyage (admin)
 */

/**
 * @swagger
 * /trips/{id}/steps:
 *   get:
 *     summary: Récupère la liste des étapes d'un voyage
 *   post:
 *     summary: Ajoute une étape à un voyage
 */

/**
 * @swagger
 * /trips/{id}/steps/{idStep}:
 *   get:
 *     summary: Récupère une étape d'un voyage
 *   patch:
 *     summary: Modifie une étape d'un voyage
 *   delete:
 *     summary: Supprime une étape d'un voyage
 */

/**
 * @swagger
 * /trips/share/{id}:
 *   post:
 *    summary: Partage un voyage (va dupliquer le voyage et créer un nouveau voyage pour l'utilisateur connecté. Cela va retourner un code qui va être l'id du nouveau voyage. Il sera valable 24heures et il pourra être utilisé pour récupérer le voyage par un autre utilisateur)
 */

/**
 * @swagger
 * /trips/import/{id}:
 *   post:
 *     summary: Importe un voyage qui va duppliquer le voyage pour l'utilisateur connecté
 */

// Port d'écoute de l'application
const port = process.env.PORT || 3009;

app.listen(port, () => {
  console.log(`Service Travel démarré sur le port ${port}`);
});