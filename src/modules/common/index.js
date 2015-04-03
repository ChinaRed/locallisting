'use strict';

module.exports =
  angular.module('locallisting.common', [
    require('./directives').name,
    require('./filters').name,
    require('./services').name
  ]);
