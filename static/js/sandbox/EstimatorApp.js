var app = angular.module("EstimatorApp",[]);
app.controller("EstimatorController", function($scope){
    var unitOptions = [1,2,3,5,8];
    var exponentOptions = ["", "Slave", "Man", "Long", "Short", "Monkey", "Unicorn"];
    var measureOptions = ["Hours","Days","Weeks","Months"];
    $scope.estimate = function(){
        $scope.units = getAnEstimateFrom(unitOptions);
        $scope.exponent = getAnEstimateFrom(exponentOptions);
        $scope.measure = getAnEstimateFrom(measureOptions);
    };
    $scope.estimate();

    function getAnEstimateFrom(array){
        return array[Math.floor(Math.random()*array.length)];
    }
});
