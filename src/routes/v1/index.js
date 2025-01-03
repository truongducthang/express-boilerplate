const express = require('express');

const router = express.Router();

router.use('/base', require('./base/base.route'))

router.use('/auth', require('./auth/auth.route'))

router.use('/user', require('./user/user.route'))

module.exports = router;
