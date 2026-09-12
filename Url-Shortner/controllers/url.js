const Url = require('../models/url')
const shortid = require('shortid');

async function handleGenerateNewShortUrl(req, res) {
    const { url } = req.body;
    if (!url) return res.status(400).json({status: 'invalid'})
    
    const shortId = shortid.generate()
    await Url.create({
        shortId: shortId,
        redirectUrl: url,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render("home", {
        id: shortId,
    })

}
  
module.exports = {
    handleGenerateNewShortUrl
}