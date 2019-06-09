const express = require('express');
let router = express.Router();

const usersController = require('../restcontrollers/UsersController');

router.get('/users', usersController.get);
router.get('/users/:username', usersController.find);
router.put('/users/:username', usersController.update);

module.exports = router;