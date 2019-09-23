import React from 'react';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import { render, unmountComponentAtNode } from 'react-dom';

import 'ui/autoload/styles';
import 'elasticsearch-browser';
import { FlexmonsterPivotTable } from './components/flexmonster/flexmonsterpivottable';

const app = uiModules.get('apps/flexmonsterPivot', ['elasticsearch'])
  .service('es', function (esFactory) {
    return esFactory({
      host: '192.168.99.201:9200'
    });
  });

app.config($locationProvider => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });
});
app.config(stateManagementConfigProvider =>
  stateManagementConfigProvider.disable()
);

function RootController($scope, $element, $http, es) {
  const domNode = $element[0];
  this.esClient = es;

  this.esClient.cluster.health(function (err, resp) {
    if (err) {
      $scope.data = err.message;
    } else {
      $scope.data = resp;
    }
  });

  // render react to DOM
  render(<FlexmonsterPivotTable httpClient={$http} esClient={this.esClient}/>, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('flexmonsterPivot', RootController);
