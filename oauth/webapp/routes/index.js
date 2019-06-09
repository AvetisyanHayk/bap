const express = require('express');
let router = express.Router();

const controller = require('../controllers/IndexController');

router.get('/', controller.index);

module.exports = router;