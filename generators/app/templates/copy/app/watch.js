var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var chokidar = require('chokidar');
var EventEmitter = require('events').EventEmitter;
var CONSTANT = require('./constant');

var watcher = chokidar.watch(CONSTANT.DATA_PATH);
var bus = new EventEmitter();

var read = function (path) {
  return fs.readFileAsync(path, 'utf8').then(function (content) {
    bus.last = content;
    bus.emit('content', content);
  });
};

watcher.on('change', read);

read(CONSTANT.DATA_PATH);

module.exports = bus;
