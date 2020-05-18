const userController = require('../controller/userController');
const passport = require('passport');
const router = require('express').Router();

router.post('/register', userController.register);
router.post('/logIn', userController.logIn);
router.get('/loggedInUser', passport.authenticate('jwt', { session: false }), userController.loggedInUser);
router.post('/edit', passport.authenticate('jwt', { session: false }), userController.editUser);
router.get('/userDetails', passport.authenticate('jwt', { session: false }), userController.userDetails);

module.exports = router;
