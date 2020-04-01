const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/dashboard', passport.authenticate('jwt', {session: false}), userController.addDetails);

module.exports = router;
