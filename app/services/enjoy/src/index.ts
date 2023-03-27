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
      title: 'API enjoye',
      version: '1.0.0',
      description: 'API pour rechercher des événements',
    },
    servers: [
      {
        url: 'http://localhost:3003',
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
 *     Enjoy:
 *       type: object
 *       required:
 *         - title
 *         - address
 *         - url
 *         - photo_url
 *         - date
 *         - duration
 *         - price
 *         - service
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the event
 *         address:
 *           type: string
 *           description: The address where the event takes place
 *         url:
 *           type: string
 *           description: The URL of the event's website
 *         photo_url:
 *           type: string
 *           description: The URL of a photo of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time of the event
 *         duration:
 *           type: string
 *           description: The duration of the event
 *         price:
 *           type: number
 *           description: The price of the event
 *         service:
 *           type: string
 *           description: A description of the services available at the event
 *         description:
 *           type: string
 *           description: A description of the event
 *     EnjoyWithId:
 *       allOf:
 *         - $ref: '#/components/schemas/Enjoy'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int32
 */

/**
 * @swagger
 * /enjoy/list:
 *   get:
 *     summary: List enjoyable events
 *     tags:
 *       - Enjoy
 *     parameters:
 *       - name: city
 *         in: query
 *         description: The city where the event takes place
 *         required: true
 *         schema:
 *           type: string
 *       - name: nb_adults
 *         in: query
 *         description: The number of adults attending the event
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: nb_children
 *         in: query
 *         description: The number of children attending the event
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: date
 *         in: query
 *         description: The date of the event
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - name: min_price
 *         in: query
 *         description: The minimum price of the event
 *         schema:
 *           type: number
 *       - name: max_price
 *         in: query
 *         description: The maximum price of the event
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: A list of enjoyable events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enjoy'
 */
app.get('/enjoy/list', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /enjoy/{eventId}:
 *   get:
 *     summary: Get an enjoyable event by ID
 *     tags:
 *       - Enjoy
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: The ID of the event to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: An enjoyable event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enjoy'
 */
app.get('/enjoy/:eventId', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /enjoy/verify/{eventId}:
 *   get:
 *     summary: Verify if an enjoyable event exists
 *     tags:
 *       - Enjoy
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: The ID of the event to verify
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The event exists
 *       '404':
 *         description: The event does not exist
 */
app.get('/enjoy/verify/:eventId', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /enjoy:
 *   post:
 *     summary: Create a new enjoyable event
 *     tags:
 *       - Enjoy
 *     requestBody:
 *       description: The event to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enjoy'
 *     responses:
 *       '201':
 *         description: The event was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enjoy'
 */
app.post('/enjoy', (req, res) => {
  // TODO: implement route
});

/**
 * @swagger
 * /enjoy:
 *   get:
 *     summary: Get all enjoyable events
 *     tags:
 *       - Enjoy
 *     responses:
 *       '200':
 *         description: A list of all enjoyable events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enjoy'
 */
app.get('/enjoy', (req, res) => {
  // TODO: implement route
});

// Port d'écoute de l'application
const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Service Enjoy démarré sur le port ${port}`);
});