const uiModules = require('ui/modules');

import uiRoutes from 'ui/routes';
import  _ from "lodash";


import 'ui/autoload/styles';
//import './less/main.less';
import {CreateIndexPatternService} from './create-index-pattern-service'
import template from './templates/index.html';
uiRoutes.enable();
uiRoutes
    .when('/', {
        template: template,
        controller: 'createIndexPattern',
        controllerAs: 'ctrl'
    })

uiModules
    .get('app/create_index_pattern', [])
    .controller('createIndexPattern', function ($scope, $location, $route, $interval, $http) {

        $scope.title = 'Create IndexPattern';
        $scope.finishLoad = false;
        $scope.description = 'Create IndexPattern';
        $scope.icon = "";

        $scope.location = $location;
        $scope.$watch('location.search()', function() {
            $scope.target = ($location.search()).target;
        }, true);

        $scope.changeTarget = function(name) {
            $location.search('target', name);
        }

        $scope.init = function () {
            var baseurl = $location.$$absUrl.split('/app')[0]
            $scope.target = ($location.search()).target;
            if(typeof $scope.target === 'undefined') {
              window.location.href=baseurl + "/app/kibana#/management"
            }else{
             var request = {'timeFieldName': '@timestamp', 'title': $scope.target};
             $http.post('../api/getIndexPattern', request).then((response) => {
               $scope.found = response.data.found;
               if($scope.found){
                 $scope.message = 'already exists'
                 $scope.createmessage = 'to view'
               }else{
                 $scope.message = 'does not exist'
                 $scope.createmessage = 'to create one'
               }
            });
           }
        }

    $scope.createPattern = function () {
      var baseurl = $location.$$absUrl.split('/app')[0]
      var request = {'timeFieldName': '@timestamp', 'title': $scope.target};
      if($scope.found){
        $http.post('../api/createShortUrl', request).then((response) => {
           window.location.href=baseurl + "/goto/shorturl" + $scope.target
        });
      }else{
        $http.post('../api/createIndexPattern', request).then((response) => {
        });
      }
    }
});
