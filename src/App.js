import React, {Component} from 'react';
import logo from './logo.svg';
import axios from 'axios'
import * as V from 'victory'
import moment from 'moment'
import './App.css';
import HourlyChart from './HourlyChart'
import DayChartContainer from './DayChartContainer'
import WeekContainer from './WeekContainer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: []
    }
  }
  componentDidMount() {
    axios
      .get('/hourlytweets')
      .then(resp => {
        this.setState({tweets: resp.data})
      })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <HourlyChart tweets={this.state.tweets} />
        <WeekContainer tweets={this.state.tweets} />
      </div>
    );
  }
}

export default App;
