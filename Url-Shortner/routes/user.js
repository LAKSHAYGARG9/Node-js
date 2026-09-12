const express = require('express');
const {handelUserSignup, handleUserLogin} = require('../controllers/user')
const router = express.Router()

router.post('/', handelUserSignup)

router.post('/login', handleUserLogin)

module.exports = router