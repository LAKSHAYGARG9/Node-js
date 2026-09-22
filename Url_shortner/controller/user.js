const User = require('../models/user')

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body
    await User.create({
        name, 
        email,
        password
    })

    res.render("home")
}
module.exports = {
    handleUserSignup,
}