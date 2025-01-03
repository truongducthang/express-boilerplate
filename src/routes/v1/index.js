const express = require('express');
const baseRoute = require('./base/base.route');
const authRoute = require('./auth/auth.route');
const userRoute = require('./user/user.route');
const config = require('../../core/configs/config');
const { cloneDeep } = require('lodash');
const { path } = require('../../app');

const router = express.Router();

const routesV1 = [
  {
    path: 'base',
    route: baseRoute,
  },
  {
    path: 'auth',
    route: authRoute,
  },
  {
    path: 'users',
    route: userRoute,
  },
];

// router.use(`/base`, baseRoute);

routesV1.forEach((route) => {
  router.use(`/${route.path}`, require(route.pathFolder));
});

module.exports = router;
