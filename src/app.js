const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const rateLimit = require('express-rate-limit');
const path = require('path');
const config = require('./core/configs/config');
const morgan = require('./core/configs/morgan');
const { jwtStrategy } = require('./core/configs/passport');
const { authLimiter } = require('./core/middlewares/rateLimiter');
const { errorConverter, errorHandler } = require('./core/middlewares/error');
const ApiError = require('./core/utils/ApiError');
const routesV1 = require('./routes/v1');
const routesV2 = require('./routes/v2');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// Routes
// Folder public
app.use('/public',express.static(path.join(__dirname, '../public')));
app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/v1/auth', authLimiter);
}

// v1 api routes
// Limit request from the same API
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request from this IP, please try again in an hour',
});
app.use('/api/v1', limiter);

app.use('/api/v1', routesV1);

// v2 api routes
app.use('/api/v2', routesV2);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
