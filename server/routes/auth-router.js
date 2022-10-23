const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.get('/loggedIn', AuthController.loggedIn)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.post('/register', AuthController.register)
router.get('/changePassword', AuthController.changePassword)
router.get('/deleteAccount', AuthController.deleteAccount)

module.exports = router