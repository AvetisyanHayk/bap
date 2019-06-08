const express = require('express');
let router = express.Router();

const controller = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get('/login', controller.login);
router.post('/login', controller.performLogin);
router.all('/logout', authMiddleware, controller.performLogout);

module.exports = router;