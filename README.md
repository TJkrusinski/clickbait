# Click Bait

Determine if a string is click bait or not.

### Why

With all the annoying buzzfeed garbage that is showing up on the internet I figure it'd be nice to have a way to weed that out. I don't know if this package has any real use case, but it actually kind of works, which is the amazing part. The classification is coming from [the natural](https://github.com/NaturalNode/natural) package that uses a [Naive Bayes](http://en.wikipedia.org/wiki/Naive_Bayes_classifier) classifier to do the magic. This package just really trains the classifier and then returns to you if something is spammy looking.

### Headline sources

The sources for spam healines are scraped from buzz feed and clickhole. The real news sources are from a few different reuters rss feeds. Look at the package.json for the packages that source that data.

## Installation

```bash
$ npm install clickbait
```

## Usage

```javascript

var clickbait = require('clickbait');

// wait for it to train itself
clickbait.on('ready', function(){

  clickbait.bait('12 amazing photos of cute dogs');
  // => "spam"

  clickbait.bait('Obama to deploy troops to middle east');
  // => "not"

});
```

## Tests

Tests run with [mocha](/visionmedia/mocha)

```bash
$ npm test
```
