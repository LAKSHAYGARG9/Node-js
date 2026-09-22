const express = require('express')
const app = express()
const path = require("path")
const multer  = require('multer')


app.use(express.urlencoded({extended: false}))


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


app.get('/', (req, res) => {
    return res.render("home")
})

app.post('/upload', upload.single("profileImage"), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    return res.redirect('/')
})

const port = 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

