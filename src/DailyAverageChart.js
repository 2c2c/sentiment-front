import React from 'react'
import ss from 'simple-statistics'
import HourlyChart from './HourlyChart'
import moment from 'moment'
import * as V from 'victory'

const DailyAverageChart = (props) => {
  const dates = (tweets) => {
    return tweets
      .map(t => moment(t.time).format('YYYY-MM-DD'))
      .filter((d, i, arr) => arr.indexOf(d) === i)
  }

  const filteredTweets = (tweets, date) => {
    return tweets.filter(t => moment(t.time).isSame(date, 'day'))
  }

  const dailyAverage = (daily_tweets) => {
    const average = ss.mean(daily_tweets.map(dt => dt.total_sent))
    return average
  }

  const averages = dates(props.tweets).map((d, i) => {
    let average = dailyAverage(filteredTweets(props.tweets, d))
    return {average_sent: average, time: d}
  })

  if (averages.length === 0) {
    return <div>loadin</div>
  }
  let tick = 10
  return (
    <V.VictoryChart>
      <V.VictoryArea
        data={averages}
        x={(datum) => moment(datum.time).format('YYYY-MM-DD')}
        y={(datum) => datum.average_sent}
        style={{
        data: {
          opacity: .4
        },
        parent: {
          border: "1px solid #ccc"
        }
      }}/>
      <V.VictoryAxis
        style={{
        axis: {
          stroke: "#756f6a"
        },
        axisLabel: {
          fontSize: 16,
          padding: 20
        },
        grid: {},
        ticks: {
          stroke: "grey"
        },
        tickLabels: {
          fontSize: 10,
          padding: 5,
          opacity: (t) => t % tick === 0
            ? 1
            : 0
        }
      }}/>
      <V.VictoryAxis dependentAxis/>
      <V.VictoryLine
        data={averages}
        x={(datum) => moment(datum.time).format('YYYY-MM-DD')}
        y={(datum) => datum.average_sent}/>
      <V.VictoryScatter
        data={averages}
        x={(datum) => moment(datum.time).format('YYYY-MM-DD')}
        y={(datum) => datum.average_sent}
        size={2}/>
      <V.VictoryVoronoiTooltip
        data={averages}
        x={(datum) => moment(datum.time).format('YYYY-MM-DD')}
        y={(datum) => datum.average_sent}
        labels={(datum) => datum.average_sent}/>
    </V.VictoryChart>
  )
}

export default DailyAverageChart