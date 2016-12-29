module.exports = {
  hourlyTweets: function (mongoose) {
    return mongoose.model('hourlytweets', {
      num_tweets: Number,
      total_sent: Number,
      low: Number,
      high: Number,
      time: String
    })
  }
}
