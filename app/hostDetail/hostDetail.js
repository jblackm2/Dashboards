/**
 * Created by blackmju on 8/11/2015.
 */
'use strict';

angular.module('myApp.hostDetail', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/hostDetail', {
            templateUrl: 'hostDetail/hostDetail.html',
            controller: 'hostDetailCtrl'
        });
    }])

    .controller('hostDetailCtrl', [function() {


    }]);