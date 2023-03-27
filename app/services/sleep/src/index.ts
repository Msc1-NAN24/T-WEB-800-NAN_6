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
      title: 'API sleep',
      version: '1.0.0',
      description: 'API pour trouver des endroits où dormir',
    },
    servers: [
      {
        url: 'http://localhost:3002',
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
 *     Sleep:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - photo_url
 *         - city
 *         - zip
 *         - country
 *         - nb_adults
 *         - nb_children
 *         - avis
 *         - description
 *         - service
 *         - checkin
 *         - checkout
 *         - price
 *       properties:
 *         title:
 *           type: string
 *         type:
 *           type: string
 *         photo_url:
 *           type: string
 *         city:
 *           type: string
 *         zip:
 *           type: string
 *         country:
 *           type: string
 *         nb_adults:
 *           type: integer
 *           format: int32
 *         nb_children:
 *           type: integer
 *           format: int32
 *         avis:
 *           type: number
 *           format: float
 *         description:
 *           type: string
 *         service:
 *           type: string
 *         checkin:
 *           type: string
 *           format: date-time
 *         checkout:
 *           type: string
 *           format: date-time
 *         price:
 *           type: number
 *           format: float
 *     SleepWithId:
 *       allOf:
 *         - $ref: '#/components/schemas/Sleep'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int32
 */

/**
 * @swagger
 * /sleep/list:
 *   get:
 *     summary: Get a list of places to sleep
 *     tags:
 *       - Sleep
 *     parameters:
 *       - name: city
 *         in: query
 *         description: The city to search for places to sleep in
 *         required: true
 *         schema:
 *           type: string
 *       - name: nb_adults
 *         in: query
 *         description: The number of adults staying at the place to sleep
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: nb_children
 *         in: query
 *         description: The number of children staying at the place to sleep
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *       - name: checkin
 *         in: query
 *         description: The check-in date for the stay
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: checkout
 *         in: query
 *         description: The check-out date for the stay
 *         required: true
 *         schema:
 *           type:
 *           format: date-time
 *       - name: min_price
 *         in: query
 *         description: The minimum price for a place to sleep
 *         schema:
 *           type: number
 *           format: float
 *       - name: max_price
 *         in: query
 *         description: The maximum price for a place to sleep
 *         schema:
 *           type: number
 *           format: float
 *     responses:
 *       '200':
 *         description: A list of places to sleep
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sleep'
 */
app.get('/sleep/list', (req, res) => {
  const { city, nb_adults, nb_children, checkin, checkout, min_price, max_price } = req.query;
  
  // Code to retrieve a list of places to sleep based on the provided query parameters
  const sleepList = [
    {
      title: 'Example Place to Sleep',
      type: 'Hotel',
      photo_url: 'https://example.com/photo.jpg',
      city: 'Paris',
      zip: '75000',
      country: 'France',
      nb_adults: 2,
      nb_children: 1,
      avis: 4.5,
      description: 'A beautiful hotel in the heart of Paris',
      service: 'Room service available',
      checkin: '2023-04-01T14:00:00Z',
      checkout: '2023-04-08T12:00:00Z',
    },
    // Add more places to sleep here
  ];

  res.json(sleepList);
});

/**
 * @swagger
 * /sleep:
 *   get:
 *     summary: Get a list of all places to sleep
 *     tags:
 *       - Sleep
 *     responses:
 *       '200':
 *         description: A list of all places to sleep
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SleepWithId'
 */
app.get('/sleep', (req, res) => {
  // Code to retrieve a list of all places to sleep from the database
  const sleepList = [
    {
      id: 1,
      title: 'Example Place to Sleep',
      type: 'Hotel',
      photo_url: 'https://example.com/photo.jpg',
      city: 'Paris',
      zip: '75000',
      country: 'France',
      nb_adults: 2,
      nb_children: 1,
      avis: 4.5,
      description: 'A beautiful hotel in the heart of Paris',
      service: 'Room service available',
      checkin: '2023-04-01T14:00:00Z',
      checkout: '2023-04-08T12:00:00Z',
    },
    // Add more places to sleep here
  ];

  res.json(sleepList);
});

/**
 * @swagger
 * /sleep/{id}:
 *   get:
 *     summary: Get a place to sleep by ID
 *     tags:
 *       - Sleep
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the place to sleep
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: The place to sleep with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SleepWithId'
 *       '404':
 *         description: The place to sleep with the specified ID was not found
 */
app.get('/sleep/:id', (req, res) => {
  const { id } = req.params;

  // Code to retrieve a place to sleep with the specified ID from the database
  const sleep = {
    id: 1,
    title: 'Example Place to Sleep',
    type: 'Hotel',
    photo_url: 'https://example.com/photo.jpg',
    city: 'Paris',
    zip: '75000',
    country: 'France',
    nb_adults: 2,
    nb_children: 1,
    avis: 4.5,
    description: 'A beautiful hotel in the heart of Paris',
    service: 'Room service available',
    checkin: '2023-04-01T14:00:00Z',
    checkout: '2023-04-08T12:00:00Z',
  };

  if (sleep) {
    res.json(sleep);
  } else {
    res.status(404).send('Place to sleep not found');
  }
});

/**
 * @swagger
 * /sleep/verify/{id}:
 *   get:
 *     summary: Check if a place to sleep still exists
 *     tags:
 *       - Sleep
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the place to sleep
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: The place to sleep with the specified ID exists
 *       '404':
 *         description: The place to sleep with the specified ID does not exist
 */
app.get('/sleep/verify/:id', (req, res) => {
  const { id } = req.params;

  // Code to check if the place to sleep with the specified ID exists in the database
  const sleepExists = true;

  if (sleepExists) {
    res.send('The place to sleep is still existent');
  } else {
    res.status(404).send('The place to sleep is no longer existent');
  }
});

/**
 * @swagger
 * /sleep:
 *   post:
 *     summary: Create a new place to sleep
 *     tags:
 *       - Sleep
 *     requestBody:
 *       description: The place to sleep to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sleep'
 *     responses:
 *       '201':
 *         description: The newly created place to sleep
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SleepWithId'
 *       '400':
 *         description: The request body was invalid
 */
app.post('/sleep', (req, res) => {
  const newSleep = req.body;

  // Code to add the new place to sleep to the database
  const createdSleep = {
    id: 1,
    ...newSleep,
  };

  res.status(201).json(createdSleep);
});

// Port d'écoute de l'application
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Service Sleep démarré sur le port ${port}`);
});