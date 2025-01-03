const swaggerAutogen = require('swagger-autogen')();

const docTemplate = {
  info: {
    title: 'API Documentation',
    description: 'API documentation for the Node.js application',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  basePath: '/api',
};

const outputFiles = [
  {
    outputFile: './swagger-output-v1.json',
    endpointsFile: '../routes/v1/index.js',
    basePath: '/api/v1',
  },
  {
    outputFile: './swagger-output-v2.json',
    endpointsFile: '../routes/v2/index.js',
    basePath: '/api/v2',
  },
];

outputFiles.forEach(({ outputFile, endpointsFile, basePath }) => {
  const doc = { ...docTemplate, basePath };
  swaggerAutogen(outputFile, [endpointsFile], doc).then(() => {
    console.log(`Generated Swagger documentation for ${basePath}`);
  });
});
