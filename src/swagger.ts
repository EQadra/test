// src/functions/swagger.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import swaggerSpec from './swaggerOptions';

export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(swaggerSpec),
  };
};
