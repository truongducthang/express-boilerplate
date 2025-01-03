const express = require('express');

const router = express.Router();

router.use('/base',
  // #swagger.tags = ['Base']
  require('./base/base.route'))

module.exports = router;
