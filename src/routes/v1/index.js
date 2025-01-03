const express = require('express');

const router = express.Router();

router.use('/base',
  // #swagger.tags = ['Base']
  require('./base/base.route'))


router.use('/auth',
  // #swagger.tags = ['Auth']
  require('./auth/auth.route'))

router.use('/users',
  // #swagger.tags = ['Users']
  require('./user/user.route'))

module.exports = router;
