const express = require('express');
const baseController = require('./base.controller');

const router = express.Router();

router
  .route('/ping')
  .get(baseController.getPingPong);

module.exports = router;
