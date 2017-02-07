// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic', 'ngAnimate']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('mainController', function($scope, $ionicPopup, $ionicListDelegate) {
  var task = new getTasks();
  $scope.tasks = task.tasks;

  $scope.viewCompletedTasks = false;

  $scope.isChecked = false;
    $scope.onCheckChanged = function (item, isChecked) {
      var _index = $scope.tasks.indexOf(item);
        if (isChecked) {
          $scope.tasks[_index].finalizada = isChecked;
        } else {
          $scope.tasks[_index].finalizada = isChecked;
        }
        task.save();
    };

    $scope.showItens = function(task) {
      return task.finalizada && !$scope.viewCompletedTasks;
    };

    $scope.onItemRemove = function(item) {
      $ionicListDelegate.closeOptionButtons();
      task.remove(item);
      task.save();
    }

    $scope.onItemEdit = function(item) {
      getItem(item, false);
    }

    $scope.onItemAdd = function() {
      var item = {nome : null, finalizada : false};
      getItem(item, true);
    }

    function getItem(item, novo) {
      $scope.data = {};
      $scope.data.newTask = item.nome;

      var title = "";
      if (novo) {
        title = "Add new task"
      } else {
        title = "Update task"
      }

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="text" placeholder="Task..." autofocus="true" ng-model="data.newTask">',
        title: title,
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          { text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.newTask) {
                e.preventDefault();
              } else if ($scope.data.newTask != null) {
                  item.nome = $scope.data.newTask;
                  if (novo) {
                    task.add(item);
                  }
                  task.save();

                }
            }
          }
        ]
      });

      $ionicListDelegate.closeOptionButtons();

  }


});
