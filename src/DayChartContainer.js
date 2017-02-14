import React from "react";
import HourlyChart from "./HourlyChart";
import moment from "moment";

// full data -> each individual date -> component with all data and specific
// date
const DayChartContainer = props => {
  const dates = tweets => {
    return tweets
      .map(t => moment(t.time).format("YYYY-MM-DD"))
      .filter((d, i, arr) => arr.indexOf(d) === i);
  };

  const filteredTweets = (tweets, date) => {
    return tweets.filter(t => moment(t.time).isSame(date, "day"));
  };

  return (
    <div style={{width: "auto", textAlign: "center", margin: "0 auto"}}>
      {dates(props.tweets).map((d, i) => (
        <HourlyChart key={i} tweets={filteredTweets(props.tweets, d)} />
      ))}
    </div>
  );
};

DayChartContainer.defaultProps = { tweets: [] };
export default DayChartContainer;
