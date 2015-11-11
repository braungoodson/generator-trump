'use strict';

angular
  .module('idiom')
  .directive('<%= dname %>', <%= dname %>);

<%= dname %>.$inject = [];

function <%= dname %>() {
  return {
    restrict: 'E',
    templateUrl: '<%= dtemplateUrlDigest %>'
  };
}
