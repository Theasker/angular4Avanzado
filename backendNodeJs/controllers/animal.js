'use strict'

// Modulos
var fs = require('fs');
var path = require('path');

// Modelos
var User = require('../models/user');
var Animal = require('../models/animal');

// Acciones
function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando controlador de animales y acción pruebas',
        user: req.user
    })
}

function saveAnimal(req, res){
    var animal = new Animal();

    var params = req.body;

    if(params.name){
        animal.name = params.name;
        animal.description = params.description;
        animal.year = params.year;
        animal.image = null;
        animal.user = req.user.sub;

        animal.save((err, animalStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!animalStored){
                    res.status(404).send({message: 'NO se ha guardado el animal'});
                }else{
                    res.status(200).send({animal: animalStored});
                }
            }
        });
    }else { // NO llega el nombre en los parámetros
        res.status(200).send({message: 'El nombre del animal es obligatirio'});
    }
}

function getAnimals(req, res){
    // si uso find con un json vacío me devuelve todos.
    Animal.find({}).populate({path: 'user'}).exec((err, animals) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if (!animals){
                res.status(404).send({message: 'NO hay animales'});
            }else {
                res.status(200).send({animals});
            }
        }
    });
}

function getAnimal(req, res){
    var animalId = req.params.id;

    // Con populate agregamos toda la información del usuario 
    // que está enlazado en la entidad Animal.
    Animal.findById(animalId).populate({path: 'user'}).exec((err, animal) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if (!animal){
                res.status(404).send({message: 'El animal no existe'});
            }else {
                res.status(200).send({animal});
            }
        }
    });
}

function updateAnimal(req, res){
    const animalId = req.params.id;
    var update = req.body;
    
    // con {new: true} le decimos que nos devuelva el objeto ya actualizado
    // en vez del objeto antes de actualizar
    Animal.findByIdAndUpdate(animalId, update, {new: true},  (err, animalUpdated) => {
        if (err){
            res.status(500).send({message: 'Error en la petición'});
        }else {
            if (!animalUpdated){
                res.status(404).send({message: 'No se ha actualizado el animal'});
            }else {
                res.status(200).send({animal: animalUpdated});            
            }
        }
    });
}


function uploadImage(req, res){
    var animalId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];
        var file_ext = file_name.split('\.')[1].toLowerCase();

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
        
            Animal.findByIdAndUpdate(animalId, {image: file_name}, {new: true}, (err, animalUpdated) => {
                if(err){
                    res.status(500).send({message: 'Error al actualizar animal'});
                }else {
                    if(!animalUpdated){
                        res.status(404).send({message: 'No se ha podido actualizar el animal'});
                    }else {
                        res.status(200).send({animal: animalUpdated, image: file_name});
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
    var path_file = './uploads/animals/'+imageFile;
    
    fs.exists(path_file, function(exists){
        if (exists){
            res.sendFile(path.resolve(path_file));
        }else {
            res.status(404).send({message: 'La imagen no existe en el servidor'});
        }
    });
}

function deleteAnimal(req, res) {
    const animalId = req.params.id;

    Animal.findByIdAndRemove(animalId, (err, animalRemoved) => {
        if (err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!animalRemoved){
                res.status(404).send({message: 'No se ha podido borrar el animal'});
            }else {
                res.status(200).send({animal: animalRemoved});
            }
        }
    });
}

module.exports = {
    pruebas,
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    uploadImage,
    getImageFile,
    deleteAnimal
};