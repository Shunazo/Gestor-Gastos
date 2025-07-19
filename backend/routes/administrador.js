const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const auth = require("../middleware/is-auth");

router.get("/home", auth, adminController.home);

router.get("/perfil/edit", auth, adminController.editPerfilForm);
router.post("/perfil/edit", auth, adminController.editPerfil);

router.get("/usuarios", auth, adminController.usuarios);
router.post("/usuarios/activate/:id", auth, adminController.activateUser);
router.post("/usuarios/deactivate/:id", auth, adminController.deactivateUser);

router.get("/administradores", auth, adminController.administradores);
router.get("/administradores/create", auth, adminController.createAdminForm);
router.post("/administradores/create", auth, adminController.createAdmin);
router.get("/administradores/edit/:id", auth, adminController.editAdminForm);
router.post("/administradores/edit/:id", auth, adminController.editAdmin);
router.post("/administradores/activate/:id", auth, adminController.activateAdmin);
router.post("/administradores/deactivate/:id", auth, adminController.deactivateAdmin);

module.exports = router;