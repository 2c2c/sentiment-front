import React from "react";
import moment from "moment";
import * as V from "victory";
import ss from "simple-statistics";

const WeekdayAverageChart = props => {
  const getDayOfWeek = date => {
    return moment(date).format("ddd");
  };

  const dates = tweets => {
    const string_dates = tweets.map(t => {
      let date = new Date(t.time);
      date.setHours(0, 0, 0, 0);
      return date.valueOf();
    });

    const uniques = Array.from(new Set(string_dates));
    return uniques;
  };

  const filteredTweets = (tweets, date) => {
    const is_same = tweets.filter(t => {
      let d = new Date(t.time);
      d.setHours(0, 0, 0, 0);
      return d.valueOf() === date;
    });
    return is_same;
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
        (acc, t, i, arr) => {
          return acc + Math.floor(Number(t.average_sent) / arr.length);
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
    <div style={{ margin: "auto", width: "80%", height: "80%" }}>
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
