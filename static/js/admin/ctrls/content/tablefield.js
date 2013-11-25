// Generated by CoffeeScript 1.6.3
(function() {
  define([], function() {
    return [
      '$scope', '$resource', '$http', '$routeParams', '$window', 'Msg', function($scope, $resource, $http, $routeParams, $window, Msg) {
        var Fields, actions, getFormField, id, _form_field;
        id = $routeParams.id;
        if (!id) {
          $window.location.href = '#/content/table';
        }
        actions = {
          update: {
            method: 'PUT'
          },
          mulit: {
            method: 'GET',
            params: {
              id: id
            }
          }
        };
        Fields = $resource("/api/tablefield", {}, actions);
        $scope.isList = true;
        $scope.fields = Fields.mulit();
        $scope.change = function(v) {
          return Fields.update(v);
        };
        _form_field = [];
        getFormField = function(callback) {
          return $http.get('/api/get.form', {
            params: {
              form: 'app.forms.cms.TableField'
            }
          }).success(function(data) {
            _form_field = data.form;
            $scope.form = angular.copy(_form_field);
            if (angular.isFunction(callback)) {
              return callback();
            }
          });
        };
        getFormField();
        return $scope.add = function() {
          $scope.isList = false;
          return $scope.form = angular.copy(_form_field);
        };
      }
    ];
  });

}).call(this);
