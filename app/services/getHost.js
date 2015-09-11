/**
 * Created by blackmju on 8/11/2015.
 */
'use strict';

angular.module('myApp.services_host', [])
    .service('getHost', function() {
        return {
            hostStatus: function ($http, $scope) {



                var data = $.param({
                    json: JSON.stringify({
                        msg: "host"
                    })
                });
                $http.post('http://localhost:8080/Servlet', data).success(function (response) {
                    host = response
                });
                return host;







            }
        }


    });