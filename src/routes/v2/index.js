const express = require('express');

const router = express.Router();

const defaultRoutes = [

];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
