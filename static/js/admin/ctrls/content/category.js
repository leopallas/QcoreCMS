// Generated by CoffeeScript 1.6.3
(function() {
  define(['admin/factory'], function(app) {
    app.controller('content_category', [
      '$scope', '$resource', '$http', function($scope, $resource, $http) {
        var Catgory, actions, getFormField, _form_field;
        actions = {
          save: {
            method: 'POST'
          },
          mulit: {
            method: 'GET',
            isArray: true
          }
        };
        Catgory = $resource('/api/category', {}, actions);
        $scope.isList = true;
        $scope.catgorys = Catgory.mulit();
        _form_field = [];
        getFormField = function(callback) {
          return $http.get('/api/get.form', {
            params: {
              form: 'app.forms.cms.Category'
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
        $scope.submitAct = function() {
          var postData;
          postData = {};
          angular.forEach($scope.form, function(field) {
            return postData[field.name] = field.data;
          });
          return Catgory.save(postData, function(ret) {
            $scope.catgorys = Catgory.mulit();
            return getFormField(function() {
              return $scope.isList = true;
            });
          });
        };
        $scope.edit = function(val) {
          $scope.isList = false;
          $scope.form = angular.copy(_form_field);
          return angular.forEach($scope.form, function(field) {
            var fieldLevel, isRemove, ix, removeCount;
            if (field.name === 'table') {
              field.disabled = true;
            } else if (field.name === 'parent') {
              fieldLevel = -1;
              ix = -1;
              removeCount = 1;
              isRemove = false;
              angular.forEach(field.choices, function(v, k) {
                var level;
                level = $.trim(v.label).split('-').length - 1;
                if (v.value.toString() === val.id.toString()) {
                  fieldLevel = level;
                  isRemove = true;
                  return ix = k;
                } else if (level <= fieldLevel && fieldLevel !== -1) {
                  return isRemove = false;
                } else if (isRemove && fieldLevel !== -1 && level > fieldLevel) {
                  return removeCount = removeCount + 1;
                }
              });
              if (ix !== -1) {
                field.choices.splice(ix, removeCount);
              }
            }
            if (val[field.name]) {
              return field.data = val[field.name];
            }
          });
        };
        return $scope.add = function() {
          $scope.isList = false;
          return $scope.form = angular.copy(_form_field);
        };
      }
    ]);
  });

}).call(this);
