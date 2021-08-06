const express = require('express');
const router = express.Router();

const AuthenticationMiddleware = require('../1-middleware/AuthenticationMiddleware');
const AuthenticationController = require('../2-controller/AuthenticationController');


// router.get('/me', AuthenticationMiddleware, UsuarioController.me);
router.post("/signin", AuthenticationController.SignIn);
router.post('/signup', AuthenticationController.SignUp);


module.exports = router;