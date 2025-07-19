const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const auth = require("../middleware/is-auth");

//router.get("/home", auth, usuarioController.home);


//TODO: 
// Ruta para editar perfil (get/post)
// Ruta para ver categorias (get)
// Ruta para ver gastos (get)
//Ruta para crear/editar/borrar categorias (get/post)
//Ruta para crear/editar/borrar gastos (get/post)
//Ruta para agregar ingresos (get/post)

module.exports = router;