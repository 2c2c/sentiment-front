import React from "react";
import { RouteTransition, presets } from "react-router-transition";

const Introduction = () => (
  <RouteTransition
    style={{
      display: "block",
      maxWidth: "50em",
      padding: ".62em",
      font: "1.2em/1.62em sans-serif",
      margin: "0 auto"
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
        data evenly.
      </p>
      <p>Interesting things I've noticed so far:</p>
      <ul>
        <li>
          Day to day sentiment is trending downwards.
        </li>
        <li>
          The weekends are predictably more positive.
        </li>
        <li>
          There have been three instances of "negative" sentiment recorded: the day of the Charlottesville attack, the day of the Vegas attack, and the hour <a href="https://www.google.com/search?q=giant+robot+duel">Giant Robot Duel</a> aired.
        </li>
      </ul>
    </div>
  </RouteTransition>
);

export default Introduction;
