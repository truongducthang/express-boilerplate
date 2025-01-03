const express = require('express');

const router = express.Router();

router.use('/base',
  // #swagger.tags = ['Base']
  require('./base/base.route'))


router.use('/auth',
  // #swagger.tags = ['Auth']
  require('./auth/auth.route'))

router.use('/user',
  // #swagger.tags = ['User']
  require('./user/user.route'))

module.exports = router;
