const express = require('express')

const Url = require('./models/url')
const path = require('path')
const {connectMongoDb} = require('./connect')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth')


const urlRouter = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRouter = require('./routes/user')


const app = express()
const port = 8001;

connectMongoDb('mongodb://localhost:27017/short_url')
.then(() => console.log('mongodb connected'))

app.set('view engine', "ejs")
app.set('views', path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use(cookieParser())




app.use('/user', userRouter)
app.use('/url', restrictToLoggedinUserOnly, urlRouter)
app.use('/', checkAuth, staticRoute)

app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId
    const entry = await Url.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    )

    if(!entry) return res.status(404).json({ error : "Short URL not found"})

    res.redirect(entry.redirectUrl)
})

app.listen(port, () => console.log(`Server is started at port: ${port}`)) 