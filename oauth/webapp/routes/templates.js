const express = require('express');
let router = express.Router();

const controller = require('../controllers/TemplatesController');

router.get('/:name', controller.get);

module.exports = router;