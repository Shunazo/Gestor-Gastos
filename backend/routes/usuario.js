const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const auth = require("../middleware/is-auth");

router.get("/home", auth, usuarioController.home);

router.get("/perfil/edit", auth, usuarioController.editPerfilForm);
router.post("/perfil/edit", auth, usuarioController.editPerfil);

router.get("/categorias", auth, usuarioController.categorias);
router.get("/gastos", auth, usuarioController.gastos);

router.get("/categorias/create", auth, usuarioController.createCategoriaForm);
router.post("/categorias/create", auth, usuarioController.createCategoria);
router.get("/categorias/edit/:id([0-9]+)", auth, usuarioController.editCategoriaForm);
router.post("/categorias/edit/:id([0-9]+)", auth, usuarioController.editCategoria);
router.post("/categorias/delete/:id([0-9]+)", auth, usuarioController.deleteCategoria);

router.get("/gastos/create", auth, usuarioController.createGastoForm);
router.post("/gastos/create", auth, usuarioController.createGasto);
router.get("/gastos/edit/:id([0-9]+)", auth, usuarioController.editGastoForm);
router.post("/gastos/edit/:id([0-9]+)", auth, usuarioController.editGasto);
router.post("/gastos/delete/:id([0-9]+)", auth, usuarioController.deleteGasto);


module.exports = router;