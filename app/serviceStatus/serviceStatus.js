'use strict';

angular.module('myApp.serviceStatus', ['ngRoute'])


.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/serviceStatus', {
    templateUrl: 'serviceStatus/serviceStatus.html',
    controller: 'serviceStatusCtrl'
  });
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common["Accept"] = "application/json, text/plain, */*";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

}])

    .controller('serviceStatusCtrl', ['$scope', 'getStatus', '$location', '$http', '$interval', function($scope, getStatus, $location, $http, $interval) {
      //$scope.status = getStatus.serviceStatus();

      $http({
        url:'http://localhost:8080/Servlet',
        method: "POST",
        data: 'message=' + 'service',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(response){$scope.status = response}).error(function(data, status){
        $scope.param1 = data;
        //$scope.param2 = data.statusText;
        if($scope.param1 == null){
          $scope.param1 = 404;
        }
        console.log(data + " " + "Error code: " + status);
        $scope.go('errorStatus', $scope.param1 + " " + "Error code: " +  status);
        });

        var interval = $interval(function(){$http({
          url:'http://localhost:8080/Servlet',
          method: "POST",
          data: 'message=' + 'service',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response){$scope.status = response; $scope.clearCount()}).error(function(data, status, config, statusText){
          console.log("Data: " + data + " " + "Status: " + status + " C: " + config + " Text: " + statusText);
          $scope.param1 = data;
          //$scope.param2 = data.statusText;
          if($scope.param1 == null){
           $scope.param1 = 404;
          }

          console.log(data + " " + "Error code: " + status);
          $scope.go('errorStatus', $scope.param1 + " " + "Error code: " +  status);
        });}, 10000);
        $scope.$on('$destroy',function(){
          $interval.cancel(interval);

        });

        $scope.go = function(path, data){
          $location.path(path).search('param', data);
      };

      $scope.getList = function() {
        return $scope.status.Individual_lists[0].Env_list;
      };

      $scope.show=function(environment){
        $scope.myValue = "true";
        console.log(environment);
        $scope.env = environment;
      };

      $scope.show2=function(name){
        console.log(name);
        $scope.clearCount();
        $scope.myValue2 = "true";
        $scope.group = name;
      };

      $scope.show3=function(name){
        console.log(name);
        $scope.myValue3 = "true";
        $scope.id = name;
      };

      $scope.hide = function(){
        $scope.myValue3 = "";
      }

      $scope.getDetail = function(name){
        //$scope.myValue = "true";
        if(name == "DIT"){
          return $scope.status.Individual_lists[0].DIT;
        }
        else if(name == "PERF"){
          return $scope.status.Individual_lists[0].PERF;
        }
        else if(name == "Stage"){
          return $scope.status.Individual_lists[0].Stage;
        }
        else if(name == "PROD"){
          return $scope.status.Individual_lists[0].PROD;
        }

      }

      $scope.getDetail1 = function(group, env){

        if(env == "DIT"){
          return $scope.status.Individual_lists[0].DIT_list;
        }
        else if(env == "PERF"){
          return $scope.status.Individual_lists[0].PERF_list;
        }
        else if(env == "Stage"){
          return $scope.status.Individual_lists[0].Stage_list;
        }
        else if(env == "PROD"){
          return $scope.status.Individual_lists[0].PROD_list;
        }

      }

      var oldDetails = '';

      $scope.getDetail2 = function(){
        if($scope.status.Individual_lists[0].Details.length == 522){
          oldDetails = angular.copy($scope.status.Individual_lists[0].Details);
          console.log($scope.status.Individual_lists[0].Details.length);
          return $scope.status.Individual_lists[0].Details;
        }

        else{
          console.log($scope.status.Individual_lists[0].Details.length);
          return oldDetails;
        }

      }

      $scope.columnBreak = 3; //Max number of columns

      $scope.columnCount = 0;

      $scope.clearCount = function () {
          $scope.columnCount = 0;
      };

      $scope.count = function () {
        $scope.columnCount+=1;
      };

      $scope.startNewRow = function (index, count) {
        return ((index) % count) === 0;
      };

}]);