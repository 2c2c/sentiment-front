import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import * as V from "victory";
import moment from "moment";
import "./App.css";
import HourlyChart from "./HourlyChart";
import DayChartContainer from "./DayChartContainer";
import WeekContainer from "./WeekContainer";
import DailyAverageChart from "./DailyAverageChart";
import Router from "react-router/BrowserRouter";
import Match from "react-router/Match";
import Link from "react-router/Link";
import Introduction from "./Introduction";

const Test = () => <div>hi</div>;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tweets: [] };
  }
  componentDidMount() {
    axios.get("/api/hourlytweets").then(resp => {
      const sorted_data = resp.data.sort((a, b) => {
        return moment.utc(a.time).diff(moment.utc(b.time));
      });

      this.setState({ tweets: sorted_data });
    });
  }
  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <div className="App-header">
              <h2>twittersent</h2>
            </div>
          </div>
          <div>
            <div>
              <Link to={"/"}>Home</Link>
            </div>
            <div>
              <Link to={"/dailyaverage"}>Daily Average Sentiment</Link>
            </div>
            <div>
              <Link to={"/hourly"}>Hourly Sentiment</Link>
            </div>
          </div>
          <Match exactly pattern="/" render={() => <Introduction />} />
          <Match
            pattern="/dailyaverage"
            render={() => <DailyAverageChart tweets={this.state.tweets} />}
          />
          <Match
            pattern="/hourly"
            render={() => <WeekContainer tweets={this.state.tweets} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
