import React from "react";
import ss from "simple-statistics";
import moment from "moment";
import * as V from "victory";
import _ from "lodash";
import { RouteTransition, presets } from "react-router-transition";
import { isHoliday, holidayName } from "./holidays";

export default class DailyAverageChart extends React.Component {
  dates = tweets => {
    const string_dates = tweets.map(t => {
      let date = new Date(t.time);
      date.setHours(0, 0, 0, 0);
      return date.valueOf();
    });

    const uniques = Array.from(new Set(string_dates));
    return uniques;
  };

  filteredTweets = (tweets, date) => {
    const is_same = tweets.filter(t => {
      let d = new Date(t.time);
      d.setHours(0, 0, 0, 0);
      return d.valueOf() === date;
    });
    return is_same;
  };

  dailyAverage = daily_tweets => {
    const average = ss.mean(daily_tweets.map(dt => dt.total_sent));
    return average;
  };

  render() {
    const averages = this.dates(this.props.tweets).map((d, i) => {
      let average = this.dailyAverage(
        this.filteredTweets(this.props.tweets, d)
      );
      return { average_sent: average, time: d };
    });

    if (averages.length === 0) {
      return <div>loadin</div>;
    }
    let tick = 15;

    return (
      <RouteTransition
        pathname="/dailyaverage"
        key="/dailyaverage"
        component={false}
        {...presets.fade}
        style={{ width: "100%", height: "100%", margin: "auto" }}
      >
        <V.VictoryChart>
          <V.VictoryArea
            data={averages}
            x={datum => new Date(datum.time).toLocaleDateString()}
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
                textShadow:
                  "-1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff",
                angle: -70,
                fontSize: 8,
                padding: 5,
                opacity: t => (t % tick === 0 ? 1 : 0)
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
            x={datum => new Date(datum.time).toLocaleDateString()}
            y={datum => datum.average_sent}
          />
          <V.VictoryScatter
            data={averages}
            x={datum => new Date(datum.time).toLocaleDateString()}
            y={datum => datum.average_sent}
            style={{
              data: {
                fill: datum => (isHoliday(datum.time) ? "#DD0000" : "#000000")
              }
            }}
            size={1}
          />
          <V.VictoryVoronoiTooltip
            data={averages}
            x={datum => new Date(datum.time).toLocaleDateString()}
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
  }
}
