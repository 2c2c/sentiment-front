import React from "react";
import * as V from "victory";
import moment from "moment";

const HourlyChart = props => {
  // make axis show 10 at a time. hack since axis prop isnt working
  let tick = Math.floor(props.tweets.length * 0.1);
  return (
    <div style={{display: "inline-block", width: "40%"}}>
      <V.VictoryChart>
        <V.VictoryArea
          data={props.tweets}
          x={datum => moment(datum.time).format("ha")}
          y={datum => datum.total_sent}
          style={{
            data: { opacity: 0.4 },
            parent: { border: "1px solid #ccc" }
          }}
        />
        <V.VictoryAxis
          scale="time"
          label={
            props.tweets
              ? moment(props.tweets[0].time).format("YYYY/MM/DD")
              : ""
          }
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 16, padding: 20 },
            grid: {},
            ticks: { stroke: "grey" },
            tickLabels: {
              fontSize: 10,
              padding: 5,
              opacity: t => t % tick === 0 ? 1 : 0
            }
          }}
        />
        <V.VictoryAxis
          dependentAxis
          label="Sentiment"
          tickLabelComponent={<V.VictoryLabel dx={5} />}
          axisLabelComponent={<V.VictoryLabel dy={-1} />}
        />
        <V.VictoryLine
          data={props.tweets}
          x={datum => moment(datum.time).format("ha")}
          y={datum => datum.total_sent}
        />
        <V.VictoryScatter
          data={props.tweets}
          x={datum => moment(datum.time).format("ha")}
          y={datum => datum.total_sent}
          size={2}
        />
        <V.VictoryVoronoiTooltip
          data={props.tweets}
          x={datum => moment(datum.time).format("ha")}
          y={datum => datum.total_sent}
          labels={datum => datum.total_sent}
        />
      </V.VictoryChart>
    </div>
  );
};

export default HourlyChart;
