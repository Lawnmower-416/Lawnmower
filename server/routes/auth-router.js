const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.get('/loggedIn', AuthController.loggedIn);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);
router.put('/changePassword', AuthController.changePassword);
router.get('/verify', AuthController.verifyUserAccount);
router.put('/deleteAccount/', AuthController.deleteAccount);
router.get('/users/:userId', AuthController.getAUser);

module.exports = router;