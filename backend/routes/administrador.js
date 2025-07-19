const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const auth = require("../middleware/is-auth");

//router.get("/home", auth, adminController.home);
//TODO: 
// Ruta para ver todos los usuarios (get) 
// Ruta para crear/editar administrador (get/post)
//Ruta para activar/desactivar usuarios (post)

module.exports = router;