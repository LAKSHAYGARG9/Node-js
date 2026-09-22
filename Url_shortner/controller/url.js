const Url = require('../models/url')
const shortid = require('shortid');


async function handleGenerateShortUrl(req, res) {
    const shortId = shortid.generate();
    const body = req.body

    if (!body.url) res.status(400).json({ error: 'url is required'})

    await Url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.render("home", {
        id: shortId
    })
}


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const entry = await Url.findOne( { shortId})
    return res.json( { totalClicks: entry.visitHistory.length, visitHistory: entry.visitHistory})
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics
}


