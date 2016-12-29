// require('dotenv').config()
var moment = require('moment')
var mongoose = require('./mongo')
var HourlyTweets = require('./schema').hourlyTweets(mongoose)

let time = "2016-12-29T23:23:33-08:00"

HourlyTweets.find({}, (err, docs) => {
  let data = docs
    .map(d => moment(d.time).format('YYYY-MM-DD'))
    .filter((d, i, arr) => arr.indexOf(d) === i)
  console.log(data)
})
// console.log(moment(time).format('YYYY-MM-DD'))