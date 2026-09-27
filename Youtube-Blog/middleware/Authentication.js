const { validateToken } = require("../service/Auth");


function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookieName];
        if(!tokenCookie){
           return  next();
        }

        try{
            const userPayload = validateToken(tokenCookie);
            req.user = userPayload;
        }
        catch (error){
            return res.render('signin', {
                error: error.message
            })
        }
        next();
    }
}

module.exports = {
    checkForAuthenticationCookie,
}