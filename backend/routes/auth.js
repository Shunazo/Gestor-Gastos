const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/register", authController.register);
router.post("/reset-token", authController.resetToken);
router.post("/new-password/:token", authController.password);

router.get("/activate/:token", authController.activateAccount);
router.get("/session", authController.checkSession); 


module.exports = router;