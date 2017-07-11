'use strict';
var schools = require('../public/schools')

module.exports.id = "initial";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  var coll = this.db.collection('school')
  coll.insert(schools, done)
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
