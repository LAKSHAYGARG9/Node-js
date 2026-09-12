const fs = require('fs')
const express = require('express')
const { connectMongodb } = require("./connection")
const app = express(); 
const port = 8000;

const {logReqRes} = require('./middleware')
const userRouter = require('./routes/user')

// connection
connectMongodb( "mongodb://127.0.0.1:27017/youtube-app-1" ).then( () => console.log('Mongodb connected'))

// Middleware - Plugin
app.use(express.urlencoded( { extended : false } ))

app.use(logReqRes("log.txt"))

// Routes
app.use("/api/users", userRouter)

app.listen(port, () => console.log(`server started at port : ${port}`));
