'use strict'

var express = require('express');
var UserController = require('../controllers/user');

// Router de express
var api = express.Router();
const md_auth = require('../middleware/authenticated');

// Protegemos la ruta con autenticación para ver si el usuario está logueado (md_auth.ensureAuth)
api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;