'use strict';

module.exports.id = "admin";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  var coll = this.db.collection('users')
  coll.insert({"user":"iturriz.educaciontdf@gmail.com", "pass":"9519ea4f51f4fceeb51623397e624447", "superuser": "true"}, done)
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
