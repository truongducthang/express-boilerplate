const express = require('express');
const baseRoute = require('./base/base.route');
const authRoute = require('./auth/auth.route');
const userRoute = require('./user/user.route');
const config = require('../../core/configs/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/base',
    route: baseRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
