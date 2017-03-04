import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import "./App.css";
import WeekdayAverageChart from "./WeekdayAverageChart";
import DayChartContainer from "./DayChartContainer";
import DailyAverageChart from "./DailyAverageChart";
import Router from "react-router-dom/BrowserRouter";
import Link from "react-router-dom/Link";
import Route from "react-router-dom/Route";

import Introduction from "./Introduction";

class App extends Component {
  tweets = [];

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
              <h2>twittersent 🐦😊😠</h2>
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
            <div>
              <Link to={"/weekdayaverage"}>Weekday Average Sentiment</Link>
            </div>
          </div>
          <Route exact path="/" render={() => <Introduction />} />
          <Route
            path="/dailyaverage"
            render={() => <DailyAverageChart tweets={this.state.tweets} />}
          />
          <Route
            path="/hourly"
            render={() => <DayChartContainer tweets={this.state.tweets} />}
          />
          <Route
            path="/weekdayaverage"
            render={() => <WeekdayAverageChart tweets={this.state.tweets} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
