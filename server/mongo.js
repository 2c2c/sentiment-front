require('dotenv').config()
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.mongo_url)

module.exports = mongoose
