const sessionIdUserMap = new Map();

const jwt = require("jsonwebtoken");
const secret = "lakshay@#$"

// function setUser(id, user) {
//     sessionIdUserMap.set(id, user);
// }

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret)
}

// function getUser(id) {
//     return sessionIdUserMap.get(id);
// }


function getUser(token) {
    if(!token) return null;
    try{
    return jwt.verify(token, secret)
    }catch(error){
        return null
    }
}


module.exports = {
    setUser,
    getUser
}
