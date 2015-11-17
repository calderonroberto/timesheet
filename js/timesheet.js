var validationApp = angular.module('validationApp', []);

validationApp.controller('mainController', function($scope,$timeout) {

  $scope.time = {
    start: new Date(1970, 0, 1, 8, 0, 0),
    end: new Date(1970, 0, 1, 17, 0, 0)
  };

  // We want fancy time calculations, and ease of input.
  // Validating this with a text input would be easier, but
  // ease of use over typing is always nice.
  $scope.time.change = function () {
    var timeDiff = $scope.time.end - $scope.time.start || 0;
    if (timeDiff > 0) {
      var minutes = timeDiff/ (1000 * 60);
      $scope.time.minutes = minutes % 60;
      $scope.time.hours = minutes / 60 | 0;
      $scope.userForm.timeStart.$setValidity("default", true);
    } else {
      $scope.time.minutes = 0;
      $scope.time.hours = 0;
      $scope.userForm.timeStart.$setValidity("default", false);
    }
  };

  $scope.submitForm = function(isValid, isPristine) {
    if (isValid && !isPristine) {
      $scope.spinnerShow = true;

      // This is just a stub for handling a 200OK from the server
      $timeout(reqDone, 1000);
      function reqDone() {
        $scope.spinnerShow = false;
        $scope.showThanks();
      }
    }
  };

  $scope.resetForm = function() {
    $scope.email = "";
    $scope.time.start = new Date(1970, 0, 1, 8, 0, 0);
    $scope.time.end = new Date(1970, 0, 1, 17, 0, 0);
    $scope.time.minutes = 0;
    $scope.time.hours = 0;
    $scope.message = angular.copy($scope.master);
    $scope.work = angular.copy($scope.master);
    $scope.userForm.$setPristine();
    $scope.showForm();
  };

  $scope.showForm = function() {
    $scope.navbarName = "Submit Timesheet";
    $scope.timesheetForm = "";
    $scope.thanksMessage = "hidden";
  };

  $scope.showThanks = function(){
    $scope.navbarName = "Timesheet Submitted";
    $scope.timesheetForm = "hidden";
    $scope.thanksMessage = "";
  };

  $scope.showForm(); //Set the initial state

});
