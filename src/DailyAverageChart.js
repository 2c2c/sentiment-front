import React from "react";
import ss from "simple-statistics";
import moment from "moment";
import * as V from "victory";
import _ from "lodash";
import { RouteTransition, presets } from "react-router-transition";

const DailyAverageChart = props => {
  // holiday libraries have issues so this shits needed

  const daysOfInterest = () => {
    const days_of_interest = [
      { date: "2017/01/28", holiday: "#MuslimBan" },
      { date: "2017/02/05", holiday: "Superbowl LI" },
      { date: "2017/02/26", holiday: "Oscars Goofup" }
    ];
    return days_of_interest;
  };
  const getHolidays = year => {
    return [
      { date: `${year}/01/01`, holiday: "New Years" },
      { date: `${year}/02/14`, holiday: "Valentine's" },
      { date: `${year}/07/04`, holiday: "4th of July" },
      { date: `${year}/10/31`, holiday: "Halloween" },
      { date: `${year}/12/25`, holiday: "Christmas" }
    ];
  };

  const isHoliday = date => {
    const holiday_list = _.concat(
      getHolidays(2016),
      getHolidays(2017),
      getHolidays(2018),
      getHolidays(2019),
      daysOfInterest()
    );

    const is_holiday = holiday_list.some(h => {
      return moment(date).isSame(h.date, "day");
    });

    return is_holiday;
  };

  const holidayName = date => {
    const holiday_list = _.concat(
      getHolidays(2016),
      getHolidays(2017),
      getHolidays(2018),
      getHolidays(2019),
      daysOfInterest()
    );

    const name = holiday_list
      .filter(h => {
        return moment(date).isSame(h.date, "day");
      })
      .map(h => h.holiday)
      .reduce((prev, curr) => curr);

    return name;
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

  if (averages.length === 0) {
    return <div>loadin</div>;
  }
  let tick = 4;

  return (
    <RouteTransition
      pathname="/dailyaverage"
      key="/dailyaverage"
      component={false}
      {...presets.fade}
    >
      <V.VictoryChart>
        <V.VictoryArea
          data={averages}
          x={datum => moment(datum.time).format("YYYY/MM/DD")}
          y={datum => datum.average_sent}
          style={{
            data: { opacity: 0.4 },
            parent: { border: "1px solid #ccc" }
          }}
        />
        <V.VictoryAxis
          scale="time"
          label="Day"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 16, padding: 20 },
            grid: {},
            ticks: { stroke: "grey" },
            tickLabels: {
              textShadow: "-1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff",
              angle: -70,
              fontSize: 8,
              padding: 5,
              opacity: t => t % tick === 0 ? 1 : 0
            }
          }}
        />
        <V.VictoryAxis
          dependentAxis
          label="Averaged Hourly Sentiment"
          tickLabelComponent={<V.VictoryLabel dx={5} />}
          axisLabelComponent={<V.VictoryLabel dy={-1} />}
        />
        <V.VictoryLine
          data={averages}
          x={datum => moment(datum.time).format("YYYY/MM/DD")}
          y={datum => datum.average_sent}
        />
        <V.VictoryScatter
          data={averages}
          x={datum => moment(datum.time).format("YYYY/MM/DD")}
          y={datum => datum.average_sent}
          style={{
            data: {
              fill: datum => isHoliday(datum.time) ? "#DD0000" : "#000000"
            }
          }}
          size={2}
        />
        <V.VictoryVoronoiTooltip
          data={averages}
          x={datum => moment(datum.time).format("YYYY/MM/DD")}
          y={datum => datum.average_sent}
          labels={datum => {
            if (isHoliday(datum.time)) {
              return `${holidayName(datum.time)}\n${Math.round(
                datum.average_sent
              )}`;
            }
            return Math.round(datum.average_sent);
          }}
        />
      </V.VictoryChart>
    </RouteTransition>
  );
};

export default DailyAverageChart;
