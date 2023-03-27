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
      title: 'API Travel',
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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     FromCity:
 *       type: string
 *       description: The city of departure
 *       example: Nantes
 *     FromAirport:
 *       type: string
 *       description: The airport of departure
 *       example: NTE
 *     ToCity:
 *       type: string
 *       description: The city of arrival
 *       example: Paris
 *     ToAirport:
 *       type: string
 *       description: The airport of arrival
 *       example: CDG
 *     Departure:
 *       type: string
 *       format: date-time
 *       description: The departure date
 *       example: 2020-01-01T12:00:00.000Z
 *     Arrival:
 *       type: string
 *       format: date-time
 *       description: The arrival date
 *       example: 2020-01-01T15:00:00.000Z
 *     Price:
 *       type: number
 *       format: float
 *       description: The price of the travel
 *       example: 100.00
 *     Avis:
 *       type: string
 *       description: The avis of the travel
 *       example: 4.5
 *     NbAdults:
 *       type: integer
 *       format: int32
 *       description: The number of adult passengers
 *       example: 1
 *     NbChildren:
 *       type: integer
 *       format: int32
 *       description: The number of child passengers
 *       example: 0
 *     Cabin:
 *       type: string
 *       description: The cabin class
 *       example: Economy
 *     TravelId:
 *       type: string
 *       description: The travel number
 *       example: AF1234
 *     TravelUrl:
 *       type: string
 *       description: The travel url
 *       example: https://www.airfrance.fr/FR/fr/local/homepage
 *     Service:
 *       type: string
 *       description: The microservice of the travel
 *       example: AIRFRANCE
 *     MinAvis:
 *       type: number
 *       format: float
 *       description: The minimum avis of the travel
 *       example: 4.5
 *     MaxAvis:
 *       type: number
 *       format: float
 *       description: The maximum avis of the travel
 *       example: 5.0
 *     MinPrice:
 *       type: number
 *       format: float
 *       description: The minimum price of the travel
 *       example: 50
 *     MaxPrice:
 *       type: number
 *       format: float
 *       description: The maximum price of the travel
 *       example: 500
 *     Id:
 *       type: integer
 *       format: int32
 *       description: Unique identifier of the travel
 *       example: 1
 * 
 * 
 *     TravelSearch:
 *       type: object
 *       required: [from_city, to_city, departure, arrival, nb_adults, nb_children]
 *       properties:
 *         from_city:
 *           $ref: '#/components/schemas/FromCity'
 *         to_city:
 *           $ref: '#/components/schemas/ToCity'
 *         departure:
 *           $ref: '#/components/schemas/Departure'
 *         arrival:
 *           $ref: '#/components/schemas/Arrival'
 *         nb_adults:
 *           $ref: '#/components/schemas/NbAdults'
 *         nb_children:
 *           $ref: '#/components/schemas/NbChildren'
 *         min_avis:
 *           $ref: '#/components/schemas/MinAvis'
 *         max_avis:
 *           $ref: '#/components/schemas/MaxAvis'
 *         min_price:
 *           $ref: '#/components/schemas/MinPrice'
 *         max_price:
 *           $ref: '#/components/schemas/MaxPrice'
 *     TravelFind:
 *       type: object
 *       required: [from_city, from_airport, to_city, to_airport, departure, arrival, price, avis, nb_adults, nb_children, cabin, travel_id, travel_url, service]
 *       properties:
 *         from_city:
 *           $ref: '#/components/schemas/FromCity'
 *         from_airport:
 *           $ref: '#/components/schemas/FromAirport'
 *         to_city:
 *           $ref: '#/components/schemas/ToCity'
 *         to_airport:
 *           $ref: '#/components/schemas/ToAirport'
 *         departure:
 *           $ref: '#/components/schemas/Departure'
 *         arrival:
 *           $ref: '#/components/schemas/Arrival'
 *         price:
 *           $ref: '#/components/schemas/Price'
 *         avis:
 *           $ref: '#/components/schemas/Avis'
 *         nb_adults:
 *           $ref: '#/components/schemas/NbAdults'
 *         nb_children:
 *           $ref: '#/components/schemas/NbChildren'
 *         cabin:
 *           $ref: '#/components/schemas/Cabin'
 *         travel_id:
 *           $ref: '#/components/schemas/TravelId'
 *         travel_url:
 *           $ref: '#/components/schemas/TravelUrl'
 *         service:
 *           $ref: '#/components/schemas/Service'
 *     Travel:
 *       type: object
 *       required: [from_city, from_airport, to_city, to_airport, departure, arrival, avis, travel_id, travel_url, service]
 *       properties:
 *         from_city:
 *           $ref: '#/components/schemas/FromCity'
 *         from_airport:
 *           $ref: '#/components/schemas/FromAirport'
 *         to_city:
 *           $ref: '#/components/schemas/ToCity'
 *         to_airport:
 *           $ref: '#/components/schemas/ToAirport'
 *         departure:
 *           $ref: '#/components/schemas/Departure'
 *         arrival:
 *           $ref: '#/components/schemas/Arrival'
 *         avis:
 *           $ref: '#/components/schemas/Avis'
 *         travel_id:
 *           $ref: '#/components/schemas/TravelId'
 *         travel_url:
 *           $ref: '#/components/schemas/TravelUrl'
 *         service:
 *           $ref: '#/components/schemas/Service'
 *     TravelWithId:
 *       allOf:
 *         - required: [id]
 *         - type: object
 *           properties:
 *             id:
 *               $ref: '#/components/schemas/Id'
 *         - $ref: '#/components/schemas/Travel'
 */

/**
 * @swagger
 * /travel/list:
 *   get:
 *     summary: Get a list of travel bookings by calling microservices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TravelSearch'
 *     responses:
 *       '200':
 *         description: A list of travel bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TravelFind'
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
 *     security:
 *       - bearerAuth: []
 *       - adminRole: []
 *     responses:
 *       '200':
 *         description: A list of travel bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TravelWithId'
 *   post:
 *     summary: Create a new travel booking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The travel booking to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Travel'
 *     responses:
 *       '201':
 *         description: The travel booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TravelWithId'
 *       '401':
 *         description: Unauthorized
 */
app.route('/travel')
  .get((req, res) => {
    // Code to retrieve all travel bookings
    res.send('All travel bookings');
  })
  .post((req, res) => {
    const newTravel = req.body;

    // Code to create a new travel booking with the provided data
    // and retrieve the created travel booking with an ID
    // Pay attention to the combination od travel_id and service, it must be unique

    const createdTravel = {
      ...newTravel,
      id: 1, // replace with the actual ID of the created travel booking
    };

    res.status(201).json(createdTravel);
  });

/**
 * @swagger
 * /travel/{travelId}:
 *   get:
 *     summary: Get a travel booking by ID
 *     security:
 *       - bearerAuth: []
 *       - adminRole: []
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
 * /verify/{travelId}:
 *   put:
 *     summary: Update if a travel booking have been modified
 *     security:
 *       - bearerAuth: []
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
 *         description: The travel booking is the same
 *       '201':
 *         description: The travel booking has been modified
 *       '404':
 *         description: The travel booking no longer exists
 */
app.put('/verify/:travelId', (req, res) => {
  // Call the microservice to verify if a travel booking still exists (It uses the servcie name and the travel_id)
  // Update the travel booking with the new data if it still exists but has been modified
  res.send('Verify if a travel booking still exists');
});

// Port d'écoute de l'application
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Service Travel démarré sur le port ${port}`);
});