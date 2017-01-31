import React from "react";
import moment from "moment";
import HourlyChart from "./HourlyChart";
import DayChartContainer from "./DayChartContainer";
import { RouteTransition, presets } from "react-router-transition";

const WeekContainer = props => {
  const weeks = tweets => {
    return tweets
      .map(t => moment(t.time).format("YYYY[W]WW"))
      .filter((d, i, arr) => arr.indexOf(d) === i);
  };

  const filteredTweets = (tweets, week) => {
    return tweets.filter(t => moment(t.time).isSame(week, "week"));
  };

  return (
    <RouteTransition
      pathname="/hourly"
      key="/hourly"
      component={false}
      {...presets.fade}
    >
      <div>
        {weeks(props.tweets).map((w, i) => (
          <DayChartContainer key={i} tweets={filteredTweets(props.tweets, w)} />
        ))}
      </div>
    </RouteTransition>
  );
};

export default WeekContainer;
