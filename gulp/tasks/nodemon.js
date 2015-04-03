'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

module.exports = gulp.task('nodemon', function () {
  nodemon({
    script: SERVER_FOLDER + '/server.js',
    env: {
      'PORT': process.env.PORT || config.ports.serverPort,
      'NODE_ENV': 'development'
    }
  });
});