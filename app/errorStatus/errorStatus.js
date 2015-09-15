/**
 * Created by blackmju on 9/14/2015.
 */
'use strict';

angular.module('myApp.errorStatus', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/errorStatus', {
            templateUrl: 'errorStatus/errorStatus.html',
            controller: 'errorStatusCtrl'

        });

    }])

    .controller('errorStatusCtrl', ['$scope', '$location','$sce', function($scope, $location, $sce) {

        $scope.status = $location.search().param;
        $scope.test = $sce.trustAsHtml($scope.status);
    }]);
