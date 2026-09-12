const mongoose = require('mongoose')

const urlScheme = new mongoose.Schema({
    shortId : {
        type: String,
        required : true,
        unique : true
    },
    redirectUrl: {
        type : String,
        required: true,
    },
    visitHistory: [ {timestamp: {type: Number} } ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true})

const Url = new mongoose.model("Url", urlScheme)

module.exports = Url;