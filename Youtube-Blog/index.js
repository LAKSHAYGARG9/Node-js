const express = require('express')
const { checkForAuthenticationCookie } = require('./middleware/Authentication')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')


const userRoute = require('./routes/user')

 
const app = express()

mongoose.connect('mongodb://localhost:27017/blogify').then(() => console.log(`mongodb connected`))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get("/",(req,res) => {
    res.render("home", {
        user: req.user,
    })
})

app.use('/user', userRoute);
app.use('/blog', blogRoute);


const port = 8000;
app.listen(port, () =>{
    console.log(`Server running on port number : ${port}`)
})

