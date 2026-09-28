const express = require('express')
const { checkForAuthenticationCookie } = require('./middleware/Authentication')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Blog = require('./models/blog')

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')


const app = express()

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/blogify').then(() => console.log(`mongodb connected`))

//setting up EJS as View Engine
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

// Home Route
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
res.render("home", {
    user: req.user,
    blogs: allBlogs,
})
}) 


// Routes
app.use('/user', userRoute);
app.use('/blog', blogRoute);


// Starting the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on port number : ${port}`)
})

