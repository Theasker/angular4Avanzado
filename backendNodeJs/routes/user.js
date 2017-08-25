'use strict'

var express = require('express');
var UserController = require('../controllers/user');

// Router de express
var api = express.Router();

api.get('/pruebas-del-controlador', UserController.pruebas);

module.exports = api;