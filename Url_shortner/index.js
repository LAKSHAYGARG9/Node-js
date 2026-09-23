const express = require('express')
const { connectToDatabase} = require('./connection')
const urlRouter = require('./routes/url')
const Url = require('./models/url')
const cookieParser = require('cookie-parser')
const { restrictToLoggedinUserOnly, checkAuth } = require('./middleware/auth')
const path = require('path')
const staticRouter = require('./routes/staticRoutes')
const userRouter = require('./routes/user')


const app = express()

connectToDatabase(`mongodb://localhost:27017/Short-url`).then(()=> console.log('database connected'))

app.set("view engine", "ejs")
app.set("views", path.resolve( "./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/url', restrictToLoggedinUserOnly, urlRouter)
app.use('/', checkAuth, staticRouter)
app.use('/user', userRouter)

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await Url.findOneAndUpdate({shortId}, { $push: {
        visitHistory: { timestamp: Date.now() }
    }})
    if(!entry){
        return res.status(400).send('url not founded')
    }

    return res.redirect(entry.redirectUrl)

})

const port = 8001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})