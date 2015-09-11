/**
 * Created by blackmju on 8/11/2015.
 */
'use strict';

angular.module('myApp.serviceDetail', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/serviceDetail', {
            templateUrl: 'serviceDetail/serviceDetail.html',
            controller: 'serviceDetailCtrl'
        });
    }])

    .controller('serviceDetailCtrl', [function() {


    }]);