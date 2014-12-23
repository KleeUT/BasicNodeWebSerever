var app = angular.module("helloWorldApp",[]);
app.controller("personController", function($scope, $http){
    $scope.title = "Hello World App";
    $scope.otherDataLoaded = false;
    $scope.myDataLoaded = false;

    $scope.loadData = function(){
        $http.get("http://www.w3schools.com/website/Customers_JSON.php")
            .success(function(response){
                $scope.customers = response;
                $scope.otherDataLoaded = true;
                $scope.myDataLoaded = false;
            });
    };

    $scope.loadMyData = function(){
        $http.get("http://localhost:8080/query")
            .success(function(response){
                $scope.customers = response;
                $scope.otherDataLoaded = false;
                $scope.myDataLoaded = true;
            })
    }
});

app.controller("formController", function($scope){
    $scope.fishStick = "";
    $scope.master = {firstName:"Bruce", lastName:"Wayne"};
    $scope.reset = function(){
        $scope.user = angular.copy($scope.master);
    };
    $scope.save = function(){
        alert("save");
    };
    $scope.reset();
});
