const { Router } = require('express');
const User = require('../models/user.js')

const router = Router();

router.get('/add-new', (req, res) => {
    return res.render('blog');
})

module.exports = router