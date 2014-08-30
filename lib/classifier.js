'use strict';

var natural = require('natural');

/**
 *  Expose `init`
 */

module.exports = init;

/**
 *  Create an instance of the classifier
 */

function init() {
  var classifier = new natural.BayesClassifier();
  return classifier;
};
