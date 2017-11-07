'use strict'

// Modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

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
                            // devolver el token 
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else {
                            console.log('Token: ', jwt.createToken(user));
                            res.status(200).send({user, token: jwt.createToken(user)});                            
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
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var file_ext = file_name.split('\.')[1].toLowerCase();

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            if(userId != req.user.sub) {
                return res.status(500).send({message: 'Es otro usuario al logueado'});
            }
        
            User.findByIdAndUpdate(userId, {image: file_name}, {new: true}, (err, userUpdated) => {
                if(err){
                    res.status(500).send({message: 'Error al actualizar usuario'});
                }else {
                    if(!userUpdated){
                        res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                    }else {
                        res.status(200).send({user: userUpdated, image: file_name});
                    }
                }
            }); 
        }else {
            fs.unlink(file_path, (err)=>{
                if (err){
                    res.status(200).send({message: 'La extensión de la imagen no es válida y fichero no borrado'});        
                }else{
                    res.status(200).send({message: 'La extensión de la imagen no es válida, fichero borrado.'});        
                }
            });
        }
    }else {
        res.status(200).send({message: 'no se han subido ficheros '});        
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;
    
    fs.exists(path_file, function(exists){
        if (exists){
            res.sendFile(path.resolve(path_file));
        }else {
            res.status(404).send({message: 'La imagen no existe en el servidor'});
        }
    });
}

function getKeepers(req, res){
    // El parámetro de find es como la cláusula WHERE en formato JSON
    User.find({role: 'ROLE_ADMIN'}).exec((err, users)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else {
            if(!users){
                res.status(404).send({message: 'No hay cuidadores'});
            }else {
                res.status(200).send({ users });
            }
        }
    });
    
}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getImageFile,
    getKeepers
};