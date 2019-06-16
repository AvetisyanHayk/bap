const express = require('express');
let router = express.Router();

const usersController = require('../restcontrollers/UsersController');
const jWTValidationMiddleware = require('../middlweares/JWTValidationMiddleware');

router.get('/users', usersController.get);
router.get('/users/*', jWTValidationMiddleware.validateRead);
router.put('/users/*', jWTValidationMiddleware.validateWrite);
router.get('/users/:username', usersController.find);
router.put('/users/:username', usersController.update);

module.exports = router;