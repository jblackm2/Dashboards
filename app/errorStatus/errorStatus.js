/**
 * Created by blackmju on 9/14/2015.
 */
'use strict';

angular.module('myApp.errorStatus', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/errorStatus', {
            templateUrl: 'errorStatus/errorStatus.html',
            controller: 'errorStatusCtrl'

        });
        //$locationProvider.html5Mode({enabled: true, requireBase: false});

    }])

    .controller('errorStatusCtrl', ['$scope', '$location', function($scope, $location) {

$scope.status = $location.search().param;
    }]);
