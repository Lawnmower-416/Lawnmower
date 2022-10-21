const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.get('/loggedIn', AuthController.getLoggedIn)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.post('/register', AuthController.registerUser)
router.get('/changePassword', AuthController.changePassword)
router.get('/deleteAccount', AuthController.deleteAccount)

module.exports = router