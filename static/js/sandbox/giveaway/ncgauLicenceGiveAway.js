var app = angular.module("GiveAwayApp",[]);
app.controller("GiveAwayController", function($scope){
    $scope.attendees = [];
    $scope.attendeeToAdd = "";
    $scope.selectedAttendees = [];

    $scope.addAttendee = function(){

        if($scope.attendees.indexOf($scope.attendeeToAdd) == -1){
            $scope.attendees.push($scope.attendeeToAdd);
            $scope.attendeeToAdd = "";
            $scope.error = "";
        }else{
            $scope.error = "Duplicate of " + $scope.attendeeToAdd
        }
    };

    $scope.selectAttendee = function(){
        var selected = selectRandomElement($scope.attendees);
        $scope.attendees.splice($scope.attendees.indexOf(selected),1);
        $scope.selectedAttendees.push({attendee:selected,prize:$scope.prize});
        $scope.prize = "";
    };

    function selectRandomElement(fromArray){
        var index = Math.floor(Math.random() * fromArray.length);
        return fromArray[index];
    }
});
