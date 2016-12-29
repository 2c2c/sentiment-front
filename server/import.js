var mongoose = require('./mongo')
var HourlyTweets = require('./schema').hourlyTweets(mongoose)

var data = require('./dat.json')

console.log(data)

HourlyTweets.insertMany(data, (err, docs) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('inserting')
  console.log(docs)
})