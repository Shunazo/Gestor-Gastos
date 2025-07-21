const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const auth = require("../middleware/is-auth");

router.get("/home", auth, usuarioController.home);

router.get("/perfil", auth, usuarioController.getPerfil); 
router.put("/perfil", auth, usuarioController.updatePerfil); 

router.get("/categorias", auth, usuarioController.categorias);
router.get("/gastos", auth, usuarioController.gastos);

router.get("/categorias", auth, usuarioController.getCategorias);
router.post("/categorias", auth, usuarioController.createCategoria);
router.put("/categorias/:id", auth, usuarioController.updateCategoria);
router.delete("/categorias/:id", auth, usuarioController.deleteCategoria);

router.get("/gastos", auth, usuarioController.getGastos);
router.post("/gastos", auth, usuarioController.createGasto);
router.put("/gastos/:id", auth, usuarioController.updateGasto);
router.delete("/gastos/:id", auth, usuarioController.deleteGasto);

router.get("/ingresos", auth, usuarioController.getIngresos);
router.post("/ingresos", auth, usuarioController.createIngreso);
router.put("/ingresos/:id", auth, usuarioController.updateIngreso);
router.delete("/ingresos/:id", auth, usuarioController.deleteIngreso);

module.exports = router;