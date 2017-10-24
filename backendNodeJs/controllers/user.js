'use strict'

// Modulos
var bcrypt = require('bcrypt-nodejs');

// Modelos
var User = require('../models/user');

// Servicio JWT
var jwt = require('../services/jwt');

// Acciones
function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando controlador de usuarios y acción pruebas',
        user: req.user
    })
}

function saveUser(req, res) {
    var user = new User();

    // recoger parámetros de la petición
    var params = req.body;
    console.log('params: ', params);

    // Si llega la contraseña y otros datos, la cifro y guardo el usuario
    if (params.password && params.name && params.surname && params.email) {
        // Asignar valores al objeto usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        // Comprobación de usuario duplicado
        // si lo encuentra nos devuelve un registro
        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
            if (err){
                res.status(500).send({message: 'error al comprobar el usuario'});
            }else {
                // comprobación de si nos llega un usuario
                if (!issetUser){ // no llega el usuario  y podemos grabar el nuevo usuario
                    // Cifrar contraseña y guardar usuario
                    bcrypt.hash(params.password, null, null, function(error, hash){
                        user.password = hash;
                        user.save( () => {
                            // Guardar usuario
                            user.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({message: 'error al guardar el usuario'});
                                }else {
                                    if (!userStored){
                                        res.status(404).send({message: 'no se ha registrado el usuario'});
                                    }else {
                                        res.status(200).send({user: userStored});
                                    }
                                }
                            })
                        });
                    });
                } else { // El usuario ya existe
                    res.status(200).send({message: 'Usuario ya existe y no puede registrarse'});
                }
            }
        });

        
    }else {
        res.status(200).send({message: 'Introduce los datos correctamente'});
    }
}

function login(req, res) {
    var params = req.body;
    var email = params.email;
    console.log('email: ', email);
    var password = params.password
    
    
    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if (err){
            res.status(500).send({
                message: 'error al comprobar el usuario'
            });
        }else {
            // comprobación de si nos llega un usuario
            if (user){ // si existe el usuario lo devuelve
                bcrypt.compare(password, user.password,(err, check) => {
                    // Comprobación de contraseña
                    if (check) { // contraseña correcta
                        // Comprobar y generar token JWT
                        if (params.getToken){
                            // devolver el token jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else {
                            res.status(200).send({user});
                        }
                    }else { // contraseña incorrecta
                        res.status(404).send({message: 'Password incorrecta, no ha podido loguearse'});
                    }
                });
                
            } else { // El usuario no existe
                res.status(404).send({message: 'Usuario no existe y no ha podido loguearse'});
            }
        }
    });
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    // Comprobamos que los datos de usuario que recibimos son del usuario logueado
    // Comparamos el id de la url y el del token (usuario logueado)
    if(userId != req.user.sub) {
        return res.status(500).send({message: 'Es otro usuario al logueado'});
    }

    // Se pasa el id a actualizar y un objeto 
    // donde estan los datos que hay que actualizar (update)
    // userUpdated: Usuario ya actualizado
    // {new: true} -> Hacemos que mongoose nos devuelva el objeto actualizado
    User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar usuario'});
        }else {
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else {
                res.status(200).send({user: userUpdated});
            }
        }
    }); 
}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        res.status(200).send({
            file_path: file_path,
            file_split: file_split,
            file_name: file_name
        });
    }else {
        res.status(200).send({message: 'no se han subido ficheros '});        
    }
}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage
};