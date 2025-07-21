const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const auth = require("../middleware/is-auth");

router.get("/home", auth, adminController.home);

router.put("/perfil", auth, adminController.updatePerfil);

router.get("/usuarios", auth, adminController.getUsuarios);
router.put("/usuarios/:id/activate", auth, adminController.activateUser);
router.put("/usuarios/:id/deactivate", auth, adminController.deactivateUser);

router.get("/administradores", auth, adminController.getAdministradores);
router.post("/administradores", auth, adminController.createAdmin);
router.put("/administradores/:id", auth, adminController.updateAdmin);
router.put("/administradores/:id/activate", auth, adminController.activateAdmin);
router.put("/administradores/:id/deactivate", auth, adminController.deactivateAdmin);

module.exports = router;
