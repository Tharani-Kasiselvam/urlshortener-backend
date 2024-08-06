const express = require('express')
const registerController = require('../controllers/registerController')

//create a Router
const router = express.Router()

//define routes
router.post('/register',registerController.register)
router.post('/activateAccount/:userId/:tokenStr',registerController.activateAccount)

//export router
module.exports = router