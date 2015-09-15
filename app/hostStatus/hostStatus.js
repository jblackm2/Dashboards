'use strict';

angular.module('myApp.hostStatus', ['ngRoute'])

.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/hostStatus', {
    templateUrl: 'hostStatus/hostStatus.html',
    controller: 'hostStatusCtrl'
  });
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

}])

.controller('hostStatusCtrl', ['$scope', '$location','getHost', '$http', '$interval', function($scope, $location, getHost, $http, $interval) {

        $http({
            url:'http://localhost:8080/Servlet',
            method: "POST",
            data: 'message=' + 'host',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response){$scope.host = response}).error(function(data, status){
            $scope.param1 = data.status;
            //$scope.param2 = data.statusText;
            if(param1 == null){
                $scope.param1 = 404;
            }

            $scope.go('errorStatus', $scope.param1 + " " + "Error code: " +  status);
        });

        var interval = $interval(function(){$http({
            url:'http://localhost:8080/Servlet',
            method: "POST",
            data: 'message=' + 'host',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response){$scope.host = response;$scope.clearCount()}).error(function(data, status){
            $scope.param1 = data.status;
            //$scope.param2 = data.statusText;
            if($scope.param1 == null){
                $scope.param1 = 404;
            }

            $scope.go('errorStatus', $scope.param1 + " " + "Error code: " +  status);
        });}, 10000);
        $scope.$on('$destroy',function(){
            $interval.cancel(interval);
        });

    $scope.go = function(path, data){
        $location.path(path).search('param', data);
    };

    $scope.getList = function() {
        return $scope.host.Individual_lists[0].Env_list;
    };

    $scope.show=function(environment){
        console.log(environment);
        $scope.myValue = "true";
        $scope.env = environment;
    };

    $scope.show2=function(name){
        console.log(name);
        $scope.clearCount();
        $scope.myValue2 = "true";
        $scope.group = name;

    };

    $scope.getDetail1 = function(name){
        if(name == "DIT"){
            var len = $scope.host.Individual_lists[0].DIT.length;
            console.log("1" + len);
            return $scope.host.Individual_lists[0].DIT;
        }
        else if(name == "PERF"){
            var len = $scope.host.Individual_lists[0].PERF.length;
            console.log("2" + len);
            return $scope.host.Individual_lists[0].PERF;
        }
        else if(name == "Stage"){
            var len = $scope.host.Individual_lists[0].Stage.length;
            console.log("3" + len);
            return $scope.host.Individual_lists[0].Stage;
        }
        else if(name == "PROD"){
            var len = $scope.host.Individual_lists[0].PROD.length;
            console.log("4" + len);
            return $scope.host.Individual_lists[0].PROD;
        }

    };

    $scope.getDetail2 = function(group, env){
        if(env == "DIT"){
            var len = $scope.host.Individual_lists[0].DIT_list.length;
            console.log(len);
            console.log($scope.host.Individual_lists[0].DIT_list);
            return $scope.host.Individual_lists[0].DIT_list;
        }
        else if(env == "PERF"){
            var len = $scope.host.Individual_lists[0].PERF_list.length;
            console.log(len);
            console.log($scope.host.Individual_lists[0].PERF_list);
            return $scope.host.Individual_lists[0].PERF_list;
        }
        else if(env == "Stage"){
            var len = $scope.host.Individual_lists[0].Stage_list.length;
            console.log(len);
            console.log($scope.host.Individual_lists[0].Stage_list);
            return $scope.host.Individual_lists[0].Stage_list;
        }
        else if(env == "PROD"){
            var len = $scope.host.Individual_lists[0].PROD_list.length;
            console.log(len);
            console.log($scope.host.Individual_lists[0].PROD_list);
            return $scope.host.Individual_lists[0].PROD_list;
        }

    };

    $scope.columnCount = 0;

    $scope.clearCount = function () {
        $scope.columnCount = 0;
    };
    $scope.count = function () {
        $scope.columnCount+=1;
    };

    $scope.range = function(n) {
        return new Array(n);
    };

    $scope.columnBreak = 3; //Max number of columns

    $scope.startNewRow = function (index, count) {
        return ((index) % count) === 0;
    };

}]);

