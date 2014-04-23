angular.module("glados", ["ngRoute", "firebase"])

.value("fbURL", "https://glados.firebaseio.com/deployments/")

.factory("Deployments", function($firebase, fbURL) {
  alert("faact");
  return $firebase(new Firebase(fbURL));
})

.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "ListController",
      templateUrl: "templates/deployments.html"
    })
    .when("/new", {
      controller: "CreateController",
      templateUrl: "templates/deployment.html"
    })
  .otherwise({
    redirectTo: "/"
  });
})

.controller("ListController", function($scope, Deployments) {
  alert("ListController");
  $scope.deployments = Deployments;
})

.controller("CreateController", function($scope, $location, $timeout, Deployments) {
  $scope.save = function() {
    Deployments.$add($scope.deployment, function() {
      $timeout(function() {$location.path("/"); });
    });
  };
});
