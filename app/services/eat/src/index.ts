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
      title: 'API Eat',
      version: '1.0.0',
      description: 'API pour trouver des endroits où manger',
    },
    servers: [
      {
        url: 'http://localhost:3004',
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
 *   schemas:
 *     Eat:
 *       type: object
 *       required:
 *         - title
 *         - photo_url
 *         - address
 *         - avis
 *         - nb_adults
 *         - nb_children
 *         - description
 *         - date
 *       properties:
 *         title:
 *           type: string
 *           description: The name of the restaurant
 *         photo_url:
 *           type: string
 *           description: The URL of a photo of the restaurant
 *         address:
 *           type: string
 *           description: The address of the restaurant
 *         avis:
 *           type: number
 *           description: The rating of the restaurant
 *         nb_adults:
 *           type: number
 *           description: The number of adults that can be seated at the restaurant
 *         nb_children:
 *           type: number
 *           description: The number of children that can be seated at the restaurant
 *         description:
 *           type: string
 *           description: A description of the restaurant
 *         date:
 *           type: string
 *           format: date
 *           description: The date when the restaurant was added to the database
 *     EatWithId:
 *       allOf:
 *         - $ref: '#/components/schemas/Eat'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int32
 */

/**
 * @swagger
 * /eat/list:
 *   get:
 *     summary: List restaurants
 *     tags:
 *       - Eat
 *     parameters:
 *       - name: city
 *         in: query
 *         description: The city where the restaurant is located
 *         required: true
 *         schema:
 *           type: string
 *       - name: nb_adults
 *         in: query
 *         description: The number of adults that can be seated at the restaurant
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: nb_children
 *         in: query
 *         description: The number of children that can be seated at the restaurant
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: date
 *         in: query
 *         description: The date when the restaurant was added to the database
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - name: min_avis
 *         in: query
 *         description: The minimum rating of the restaurant
 *         schema:
 *           type: number
 *       - name: max_avis
 *         in: query
 *         description: The maximum rating of the restaurant
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: A list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Eat'
 */
app.get('/eat/list', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /eat/{restaurantId}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags:
 *       - Eat
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         description: The ID of the restaurant to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EatWithId'
 */

/**
 * @swagger
 * /eat/verify/{restaurantId}:
 *   get:
 *     summary: Verify if a restaurant exists
 *     tags:
 *       - Eat
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         description: The ID of the restaurant to verify
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The restaurant exists
 *       '404':
 *         description: The restaurant does not exist
 */
app.get('/eat/:restaurantId', (req, res) => {
  // TODO: implement route
});

app.get('/eat/verify/:restaurantId', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /eat:
 *   post:
 *     summary: Create a new restaurant
 *     tags:
 *       - Eat
 *     requestBody:
 *       description: The restaurant to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Eat'
 *     responses:
 *       '201':
 *         description: The restaurant was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EatWithId'
 */
app.post('/eat', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /eat:
 *   get:
 *     summary: Get all restaurants
 *     tags:
 *       - Eat
 *     responses:
 *       '200':
 *         description: A list of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EatWithId'
 */
app.get('/eat', (req, res) => {
  // TODO: implement route
});

// Port d'écoute de l'application
const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`Service Eat démarré sur le port ${port}`);
});