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
      title: 'API travel',
      version: '1.0.0',
      description: 'API pour gérer les recherches de moyens de locomotion pour voyager',
    },
    servers: [
      {
        url: 'http://localhost:3001',
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

// Route de l'application pour les recherches de moyens de locomotion
/**
 * @swagger
 * /travel/list:
 *   get:
 *     summary: Get a list of travel bookings
 *     tags:
 *       - Travel
 *     parameters:
 *       - name: from_city
 *         in: query
 *         description: The city of departure
 *         required: true
 *         schema:
 *           type: string
 *       - name: to_city
 *         in: query
 *         description: The city of arrival
 *         required: true
 *         schema:
 *           type: string
 *       - name: nb_adults
 *         in: query
 *         description: The number of adult passengers
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: nb_children
 *         in: query
 *         description: The number of child passengers
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: departure
 *         in: query
 *         description: The departure date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: arrival
 *         in: query
 *         description: The arrival date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: min_price
 *         in: query
 *         description: The minimum price
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *       - name: max_price
 *         in: query
 *         description: The maximum price
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *     responses:
 *       '200':
 *         description: A list of travel bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Travel'
 */
app.get('/travel/list', (req, res) => {
  // Code to retrieve the list of travel bookings
  res.send('List of travel bookings');
});

/**
 * @swagger
 * /travel:
 *   get:
 *     summary: Get all travel bookings
 *     tags:
 *       - Travel
 *     responses:
 *       '200':
 *         description: A list of travel bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Travel'
 */
app.get('/travel', (req, res) => {
  // Code to retrieve all travel bookings
  res.send('All travel bookings');
});

/**
 * @swagger
 * /travel/{travelId}:
 *   get:
 *     summary: Get a travel booking by ID
 *     tags:
 *       - Travel
 *     parameters:
 *       - name: travelId
 *         in: path
 *         description: The ID of the travel booking to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: The travel booking with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TravelWithId'
 *       '404':
 *         description: The travel booking with the specified ID was not found
 */
app.get('/travel/:travelId', (req, res) => {
  // Code to retrieve a travel booking by ID
  res.send('Travel booking by ID');
});

/**
 * @swagger
 * /travel/{travelId}:
 * /verify/{travelId}:
 *   get:
 *     summary: Verify if a travel booking still exists
 *     tags:
 *       - Travel
 *     parameters:
 *       - name: travelId
 *         in: path
 *         description: The ID of the travel booking to verify
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: The travel booking still exists
 *       '404':
 *         description: The travel booking no longer exists
 */
app.get('/verify/:travelId', (req, res) => {
  // Code to verify if a travel booking still exists
  res.send('Verify if a travel booking still exists');
});

/**
 * @swagger
 * /travel:
 *   post:
 *     summary: Create a new travel booking
 *     tags:
 *       - Travel
 *     requestBody:
 *       description: The travel booking to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Travel'
 *     responses:
 *       '201':
 *         description: The created travel booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TravelWithId'
 */
app.post('/travel', (req, res) => {
  const newTravel = req.body;

  // Code to create a new travel booking with the provided data
  // and retrieve the created travel booking with an ID

  const createdTravel = {
    ...newTravel,
    id: 1, // replace with the actual ID of the created travel booking
  };

  res.status(201).json(createdTravel);
});

// Définition des composants de l'API pour Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Travel:
 *       type: object
 *       properties:
 *         from_city:
 *           type: string
 *         from_airport:
 *           type: string
 *         to_city:
 *           type: string
 *         to_airport:
 *           type: string
 *         departure:
 *           type: string
 *           format: date-time
 *         arrival:
 *           type: string
 *           format: date-time
 *         duration:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         nb_adults:
 *           type: integer
 *           format: int32
 *         nb_children:
 *           type: integer
 *           format: int32
 *         cabin:
 *           type: string
 *         flight_number:
 *           type: string
 *         service:
 *           type: string
 *     TravelWithId:
 *       allOf:
 *         - $ref: '#/components/schemas/Travel'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int32
 */
// Fin de la définition des composants de l'API pour Swagger

// Port d'écoute de l'application
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Service Travel démarré sur le port ${port}`);
});