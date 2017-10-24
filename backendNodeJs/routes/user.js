'use strict'

var express = require('express');
var UserController = require('../controllers/user');

// Router de express
var api = express.Router();
const md_auth = require('../middleware/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/users' });

// Protegemos la ruta con autenticación para ver si el usuario está logueado (md_auth.ensureAuth)
api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);

module.exports = api;