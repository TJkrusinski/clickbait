'use strict';

var events = require('events');
var clickhole = require('clickhole-headlines');
var Feedtitles = require('feedtitles');
var classifier = require('./lib/classifier')();

/**
 *  Boolean for when we are ready
 */

var ready = false;

/**
 *  Give this module an event emitter
 */

var exports = module.exports = Object.create(events.EventEmitter.prototype);

/**
 *  Go get some clickhole garbage and start trainging
 */

clickhole(train, 10);

/**
 *  Our train function for clickhole
 *
 *  @param {Boolean} err
 *  @parma {Array} titles
 */

function train(err, titles) {
  if (err) return exports.emit('error', err);

  titles.forEach(function(title){
    classifier.addDocument(title, 'spam');
  });

  // we're calling ready here because clickhole is going to take longer
  // than the rss feeds will
  ready = true;
  classifier.train();
  exports.emit('ready');
};

/**
 *  Some links to 'reputable' new sources
 */

var world = 'http://feeds.reuters.com/Reuters/worldNews';
var us = 'http://feeds.reuters.com/Reuters/domesticNews';

/**
 *  Create our title parser feed
 */

var feed = new Feedtitles(world);

/**
 *  Feed again
 */

feed.feed(us);

/**
 *  When we find an individual title, train `not` on it
 */

feed.on('title', function(title){
  classifier.addDocument(title, 'not');
});

/**
 *  Let the users find out if something is click bait or not
 *
 *  @param {String} phrase
 *  @return {String}
 */

exports.bait = function(phrase) {
  if (!ready) return null;
  return classifier.classify(phrase);
};
