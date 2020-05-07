const userController = require('../controller/userController');
const passport = require('passport');
const router = require('express').Router();

router.post('/register', userController.register);
router.post('/logIn', userController.logIn);
router.get('/dashboard', passport.authenticate('jwt', { session: false }), userController.dashboard);
router.put('/edit', passport.authenticate('jwt', { session: false }), userController.editUser);

module.exports = router;
