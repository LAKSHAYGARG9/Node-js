const jwt = require('jsonwebtoken');
const secret = "lakshay12@#@$%"

function createTokenForUser(user){
    return jwt.sign({
        id: user._id,
        email: user.email,
        profileImageURL : user.profileImageURL,
        role: user.role,
    },secret)
}

function validateToken(token) {
    const payload =  jwt.verify(token, secret);
    return payload;
}


module.exports = {
    createTokenForUser,
    validateToken
}

