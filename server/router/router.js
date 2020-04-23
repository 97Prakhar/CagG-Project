const userController = require('../controller/userController');
const router = require('express').Router();

router.post('/login', userController.logIn);
router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var response = {}
    response.status = true;
    response.data = req.user;
    res.status(200).send(response);
});
router.post('/edit', userController.editUser);

module.exports = router;
