const express = require('express');
let router = express.Router();

const controller = require('../controllers/IndexController');

router.get('/', controller.index);
router.post('/', controller.update);

module.exports = router;