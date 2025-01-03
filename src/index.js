const mongoose = require('mongoose');
const app = require('./app');
const config = require('./core/configs/config');
const logger = require('./core/configs/logger');
const clientEureka = require('./core/configs/eureka');

let server;

// Connect to mongoose
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error('Error connect MongoDB');
  });

// Connect Eureka
if (config.env === 'production') {
  clientEureka.start((error) => {
    if (error) {
      logger.error('Eureka registration failed:', error);
    } else {
      logger.info('Eureka registration successful');
    }
  });
}

// Service handlers for connect
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
