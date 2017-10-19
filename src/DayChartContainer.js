import React from "react";
import HourlyChart from "./HourlyChart";
import moment from "moment";

// full data -> each individual date -> component with all data and specific
// date
const DayChartContainer = props => {
  const dates = tweets => {
    const string_dates = tweets.map(t => {
      let date = new Date(t.time);
      date.setHours(0, 0, 0, 0);
      return date.valueOf();
    });

    const uniques = Array.from(new Set(string_dates)).slice(-50);
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

  return (
    <div style={{ width: "auto", textAlign: "center", margin: "0 auto" }}>
      {dates(props.tweets).map((d, i) => (
        <HourlyChart key={i} tweets={filteredTweets(props.tweets, d)} />
      ))}
    </div>
  );
};

DayChartContainer.defaultProps = { tweets: [] };
export default DayChartContainer;
