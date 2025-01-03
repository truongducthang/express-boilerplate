const swaggerAutogen = require('swagger-autogen')();

const docTemplate = {
  info: {
    title: 'API Documentation',
    description: 'API documentation for the Node.js application',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  basePath: '/',
  tags: [
    {
      name: 'Auth',
      description: 'Authentication related API routes, such as register, login, logout, and token refresh',
    },
    {
      name: 'User',
      description: 'User management routes',
    },
  ],
  securityDefinitions: {},
  definitions: {}
};

const endpointsFiles = ['../app.js'];

swaggerAutogen('./swagger-output.json', endpointsFiles, docTemplate).then(() => {
  console.log(`Generated Swagger documentation`);
});
