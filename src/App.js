import React, {Component} from 'react';
import logo from './logo.svg';
import axios from 'axios'
import * as V from 'victory'
import moment from 'moment'
import './App.css';
import HourlyChart from './HourlyChart'

const VictoryBar = V.VictoryBar
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
        <V.VictoryChart>
          <V.VictoryArea
            data={this.state.tweets}
            x={(datum) => moment(datum.time).format('ha')}
            y={(datum) => datum.total_sent}/>
        </V.VictoryChart>
      </div>
    );
  }
}

export default App;
