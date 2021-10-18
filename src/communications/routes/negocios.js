const express = require('express');
const controllers = require('../../controllers');
const negociosControllers = require('../../controllers/negocios');

const router = express.Router();

router.get('/', async (req, res) => {
    controllers.execute(req, res, await negociosControllers.list);
});

router.get('/integrar', async (req, res) => {
    controllers.execute(req, res, await negociosControllers.integratePipedriveAndBling);
});

module.exports = router;
