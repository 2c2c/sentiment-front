import React from 'react'
import * as V from 'victory'
import moment from 'moment'

const HourlyChart = (props) => (
  <V.VictoryChart>
    <V.VictoryArea
      data={props.tweets}
      x={(datum) => moment(datum.time).format('ha')}
      y={(datum) => datum.total_sent}/>
  </V.VictoryChart>
)

export default HourlyChart;