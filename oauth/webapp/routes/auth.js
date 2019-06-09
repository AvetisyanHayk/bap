const express = require('express');
let router = express.Router();

const controller = require('../controllers/AuthController');

router.post('/login?', controller.performLogin);

module.exports = router;