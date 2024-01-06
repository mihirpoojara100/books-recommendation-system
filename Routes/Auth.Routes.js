const express = require('express');
const router = express.Router();
const AuthController = new (require('../Controllers/Auth.Controller'))();

router.route('/signup').post(AuthController.signup);
router.post('/login', AuthController.login);

module.exports = router;
