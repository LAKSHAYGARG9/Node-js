const express = require('express')
const { connectToDatabase} = require('./connection')
const urlRouter = require('./routes/url')
const Url = require('./models/url')
const path = require('path')
const staticRouter = require('./routes/staticRoutes')

const app = express()

connectToDatabase(`mongodb://localhost:27017/Short-url`).then(()=> console.log('database connected'))

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/url', urlRouter)
app.use('/', staticRouter)
 
app.get('/url/ :shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await Url.findOneAndUpdate({ shortId}, { $push: {
        visitHistory: { timestamp: Date.now() }
    }})

    return res.redirect(entry.redirectUrl)

})

const port = 8001

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})