'use strict';

var clickbait = require('..');
var assert = require('chai').assert;
var fs = require('fs');

var not = fs.readFileSync(__dirname+'/fixtures/not.txt').toString().split('\n');
var spam = fs.readFileSync(__dirname+'/fixtures/spam.txt').toString().split('\n');

not = not.filter(filter);
spam = spam.filter(filter);

function filter(title) {
  return !!title;
};

describe('clickbait', function(){
  it('has event emitter methods', function(){
    assert.isFunction(clickbait.on);
    assert.isFunction(clickbait.emit);
  });
});

describe('clickbait#bait()', function(){
  this.timeout(40000);

  it('classifies something as bait', function(d){
    clickbait.on('ready', function(){

      // taken from real new sources
      not
      .forEach(function(title){
        var res = clickbait.bait(title);
        assert.equal(res, 'not');
      });

      // taken from buzzfeed
      spam
      .forEach(function(title){
        var buzz = clickbait.bait(title);
        assert.equal(buzz, 'spam');
      });

      d();
    });

    // fail on error
    clickbait.on('error', function() { d(true) });
  });
});
