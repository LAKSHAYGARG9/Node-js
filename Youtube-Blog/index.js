const express = require('express')
const path = require('path')
const mongoose = require('mongoose')


const userRoute = require('./routes/user')


const app = express()

mongoose.connect('mongodb://localhost:27017/blogify').then(() => console.log(`mongodb connected`))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false}))

app.get("/",(req,res) => {
    res.render("home")
})

app.use('/user', userRoute);


const port = 8000;
app.listen(port, () =>{
    console.log(`Server running on port number : ${port}`)
})