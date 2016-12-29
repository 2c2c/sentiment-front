import React from 'react'
import moment from 'moment'
import HourlyChart from './HourlyChart'

const DayChart = (props) => (<HourlyChart
  tweets={props
  .tweets
  .filter(t => moment(t.time).isSame(props.date, 'day'))}/>)

  export default DayChart