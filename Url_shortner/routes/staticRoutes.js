const express = require("express");
const router = express.Router()
const Url = require('../models/url')


router.get("/", async(req, res) => {
    const allurls = await Url.find({})
    return res.render("home", {
        urls: allurls
    })
})


module.exports = router
