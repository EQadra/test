// swaggerOptions.ts
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Serverless de Ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API Serverless usando Swagger',
    },
    servers: [
      {
        url: 'https://{api-id}.execute-api.{region}.amazonaws.com/{stage}', // Cambia esto según tu API Gateway
      },
    ],
  },
  apis: ['./src/functions/*.ts'], // Rutas a tus archivos de funciones donde están los comentarios de Swagger
};

const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;
