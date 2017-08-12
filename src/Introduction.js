import React from "react";
import { RouteTransition, presets } from "react-router-transition";

const Introduction = () => (
  <RouteTransition
    style={{
      display: "block",
      maxWidth: "50em",
      padding: ".62em",
      font: "1.2em/1.62em sans-serif"
    }}
    pathname="/"
    key="/"
    component={false}
    {...presets.fade}
  >
    <div>
      <p>
        Every hour I tap twitter's random stream to collect 10000 tweets. I apply a
        sentiment scoring algorithm on each tweet and sum it as that hour's hourly
        sentiment.
      </p>
      <p>
        The process isn't as good as it could be. Tweets have a lot of noise in
        them-- usernames, urls, emojis, images, etc. None of this can be accurately
        quantified sentiment, so it would be better to filter the noise out. Since the
        tweets are random, I just assume the noise as uncertainty applying to all of the
        data evenly (I'm lazy and scientific accuracy was never my intention). The data
        gathering was originally done locally, so there's missing hours of data for the
        first several weeks.
      </p>
      <p>The two hypothesis I wanted to test with this were:</p>
      <ul>
        <li>
          Is there a distinct increase in positive sentiment on major holidays? Weekends?
        </li>
        <li>
          The world appears to be getting more divisive and angry. Is average
          sentiment per day trending downwards?
        </li>
      </ul>
      <p>
        For what it's worth, Dec 31/Jan 1 show a distinct peak in the data as of
        writing this.
      </p>
      <p>
        This was largely just a toy project to test victoryjs, the new react router
        v4 api, and heroku deployment.
      </p>
    </div>
  </RouteTransition>
);

export default Introduction;
