declare module 'swagger-jsdoc' {
    interface SwaggerDefinition {
      openapi: string;
      info: {
        title: string;
        version: string;
        description?: string;
      };
      servers?: { url: string }[];
      paths?: Record<string, any>;
      components?: Record<string, any>;
    }
  
    interface SwaggerJSDocOptions {
      swaggerDefinition: SwaggerDefinition;
      apis: string[];
    }
  
    function swaggerJsDoc(options: SwaggerJSDocOptions): any;
  
    export default swaggerJsDoc;
  }
  