import React from "react";
import moment from "moment";
import * as V from "victory";
import ss from "simple-statistics";

const WeekdayAverageChart = props => {
  const getDayOfWeek = date => {
    return moment(date).format("ddd");
  };

  const dates = tweets => {
    return tweets
      .map(t => moment(t.time).format("YYYY/MM/DD"))
      .filter((d, i, arr) => arr.indexOf(d) === i);
  };

  const filteredTweets = (tweets, date) => {
    return tweets.filter(t => moment(t.time).isSame(date, "day"));
  };

  const dailyAverage = daily_tweets => {
    const average = ss.mean(daily_tweets.map(dt => dt.total_sent));
    return average;
  };

  const averages = dates(props.tweets).map((d, i) => {
    let average = dailyAverage(filteredTweets(props.tweets, d));
    return { average_sent: average, time: d };
  });

  const sentimentByDay = (tweets, weekday) => {
    let sum = tweets
      .filter(t => {
        let day = getDayOfWeek(t.time);
        return day === weekday;
      })
      .reduce(
        (acc, t) => {
          return acc + Math.floor(Number(t.average_sent) / sum.length);
        },
        0
      );
    return { weekday, sum };
  };

  const mappedSums = [
    sentimentByDay(averages, "Mon"),
    sentimentByDay(averages, "Tue"),
    sentimentByDay(averages, "Wed"),
    sentimentByDay(averages, "Thu"),
    sentimentByDay(averages, "Fri"),
    sentimentByDay(averages, "Sat"),
    sentimentByDay(averages, "Sun")
  ];
  return (
    <div>
      <V.VictoryChart>
        <V.VictoryBar
          data={mappedSums}
          x="weekday"
          y={datum => datum.sum}
          labels={datum => datum.sum}
        />
        <V.VictoryAxis />
      </V.VictoryChart>
    </div>
  );
};

export default WeekdayAverageChart;
