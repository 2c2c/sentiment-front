Front end for twitter sentiment analysis.

http://twittersent.herokuapp.com/

Every hour I tap twitter's random stream to collect 10000 tweets. I apply a sentiment scoring algorithm on each tweet and sum it as that hour's hourly sentiment.

The process isn't as good as it could be. Tweets have a lot of noise in them-- usernames, urls, emojis, images, etc. None of this can be accurately quantified sentiment, so it would be better to filter the noise out. Since the tweets are random, I just assume the noise as uncertainty applying to all of the data evenly (I'm lazy and scientific accuracy was never my intention). The data gathering was originally done locally, so there's missing hours of data for the first several weeks.

The two hypothesis I wanted to test with this were:
* Is there a distinct increase in positive sentiment on major holidays? Weekends?
* The world appears to be getting more divisive and angry. Is average sentiment per day trending downwards?

For what it's worth, Dec 31/Jan 1 show a distinct peak in the data as of writing this.

This was largely just a toy project to test victoryjs, the new react router v4 api, and heroku deployment.

