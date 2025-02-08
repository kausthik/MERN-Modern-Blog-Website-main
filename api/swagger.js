import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const router = express.Router();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Jaydeep's Blog API Documentation",
      version: '1.0.0',
      description: 'API documentation for the Blog REST API',
      contact: {
        name: 'Jaydeep Pipaliya',
        email: 'jaydeep@intalk.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', 
        description: 'Development server',
      },
    ],
  },
  apis: ['./api/routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
