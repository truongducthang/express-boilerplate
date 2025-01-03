const express = require('express');

const router = express.Router();

router.use('/base', require('./base/base.route'))

module.exports = router;
