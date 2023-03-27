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
      title: 'API Drink',
      version: '1.0.0',
      description: 'API pour trouver des endroits où boire',
    },
    servers: [
      {
        url: 'http://localhost:3005',
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
 *     Drink:
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
 *           description: The name of the bar
 *         photo_url:
 *           type: string
 *           description: The URL of a photo of the bar
 *         address:
 *           type: string
 *           description: The address of the bar
 *         avis:
 *           type: number
 *           description: The rating of the bar
 *         nb_adults:
 *           type: number
 *           description: The number of adults that can be seated at the bar
 *         nb_children:
 *           type: number
 *           description: The number of children that can be seated at the bar
 *         description:
 *           type: string
 *           description: A description of the bar
 *         date:
 *           type: string
 *           format: date
 *           description: The date when the bar was added to the database
 *     DrinkWithId:
 *       allOf:
 *         - $ref: '#/components/schemas/Drink'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int32
 */

/**
 * @swagger
 * /drink/list:
 *   get:
 *     summary: List drinks
 *     tags:
 *       - Drink
 *     parameters:
 *       - name: city
 *         in: query
 *         description: The city where the drink is located
 *         required: true
 *         schema:
 *           type: string
 *       - name: nb_adults
 *         in: query
 *         description: The number of adults that can be seated at the drink
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: nb_children
 *         in: query
 *         description: The number of children that can be seated at the drink
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: date
 *         in: query
 *         description: The date when the drink was added to the database
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - name: min_avis
 *         in: query
 *         description: The minimum rating of the drink
 *         schema:
 *           type: number
 *       - name: max_avis
 *         in: query
 *         description: The maximum rating of the drink
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: A list of drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Drink'
 */
app.get('/drink/list', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /drink/verify/{drinkId}:
 *   get:
 *     summary: Verify if a drink exists
 *     tags:
 *       - Drink
 *     parameters:
 *       - name: drinkId
 *         in: path
 *         description: The ID of the drink to verify
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The drink exists
 *       '404':
 *         description: The drink does not exist
 */
app.get('/drink/verify/:drinkId', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /drink:
 *   post:
 *     summary: Create a new drink
 *     tags:
 *       - Drink
 *     requestBody:
 *       description: The drink to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Drink'
 *     responses:
 *       '201':
 *         description: The drink was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DrinkWithId'
 */
app.post('/drink', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /drink:
 *   get:
 *     summary: Get all drinks
 *     tags:
 *       - Drink
 *     responses:
 *       '200':
 *         description: A list of all drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DrinkWithId'
 */
app.get('/drink', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /drink/{drinkId}:
 *   get:
 *     summary: Get a drink by ID
 *     tags:
 *       - Drink
 *     parameters:
 *       - name: drinkId
 *         in: path
 *         description: The ID of the drink to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A drink
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DrinkWithId'
 */
app.get('/drink/:drinkId', (req, res) => {
  // TODO: implement route
});

// Port d'écoute de l'application
const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Service Drink démarré sur le port ${port}`);
});