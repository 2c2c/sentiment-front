import React from 'react'
import DayChart from './DayChart'
import HourlyChart from './HourlyChart'

// full data -> each individual date -> component with all data and specific
// date
const DayChartContainer = (props) => {
  dates = (tweets) => {
    tweets
      .map(t => moment(tweets.date).format('MM-DD-YYYY'))
      .filter((d, i, arr) => arr.indexOf(d) === i)
  }

  filteredTweets = (tweets, date) => {
    tweets.filter(t => moment(t.time).isSame(date, 'day'))
  }

  return (dates(props.tweets).map(d => <HourlyChart tweets={filteredTweets(props.tweets, d)}/>))
}