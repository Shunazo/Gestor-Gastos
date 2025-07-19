const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get("/", authController.loginForm);
router.post("/", authController.login);

router.post("/logout", authController.logout);

router.get("/register", authController.registerForm);
router.post("/register", authController.register);

router.get("/reset-password", authController.resetForm);
router.post("/reset-password", authController.resetToken);

router.get("/new-password", authController.passwordForm);
router.post("/new-password", authController.password);

router.get("/auth/activate/:token", authController.activate);

module.exports = router;