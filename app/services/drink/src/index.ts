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

// Route de l'application pour l'authentification

// Fin de la définition des composants de l'API pour Swagger

// Port d'écoute de l'application
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Service Travel démarré sur le port ${port}`);
});