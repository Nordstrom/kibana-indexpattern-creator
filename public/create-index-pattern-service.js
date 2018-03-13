import _ from 'lodash';
//import rison from 'rison'
import packageJson from '../package.json';
const uiModules = require('ui/modules');

import Q from 'q';

const kibanaVersion = packageJson.kibana.version;

export class KibanaApiService {

  static callServer(method, path, body, $http) {
      let deferred = Q.defer();

      $http[method](path, body).then((response) => {
          deferred.resolve(response)
      });
      return deferred.promise;
  }


  static createIndexPattern(iIndex, iTimeField, $http) {
      let deferred = Q.defer();
      let request = {
          "title": iIndex,
          "notExpandable": true
      }
      if (iTimeField) {
          request["timeFieldName"] = iTimeField
      }
      KibanaApiService.callServer("post", '../api/createIndexPattern', request, $http).then(function (response) {
          deferred.resolve(response);
      });
      return deferred.promise;
  }
}
