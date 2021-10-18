const express = require('express');

const router = express.Router();

router.use('/api/negocios', require('./negocios'));

module.exports = router;