const express = require('express');
let router = express.Router();

const controller = require('../controllers/IndexController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', authMiddleware, controller.index);
router.post('/', authMiddleware, controller.update);

module.exports = router;