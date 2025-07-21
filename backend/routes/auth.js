const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);

router.post("/auth/register", authController.register);
router.post("/auth/reset-token", authController.resetToken);
router.post("/auth/new-password/:token", authController.password);

router.get("/auth/activate/:token", authController.activateAccount);
router.get("/auth/session", authController.checkSession); 


module.exports = router;