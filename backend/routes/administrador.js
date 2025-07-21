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

router.get("/usuarios", auth, adminController.getUsuarios);
router.put("/usuarios/:id/activate", auth, adminController.activateUser);
router.put("/usuarios/:id/deactivate", auth, adminController.deactivateUser);

router.get("/administradores", auth, adminController.getAdministradores);
router.post("/administradores", auth, adminController.createAdmin);
router.put("/administradores/:id", auth, adminController.updateAdmin);
router.put("/administradores/:id/activate", auth, adminController.activateAdmin);
router.put("/administradores/:id/deactivate", auth, adminController.deactivateAdmin);


module.exports = router;