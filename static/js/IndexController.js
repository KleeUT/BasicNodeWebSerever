var app = angular.module("IndexApp", []);
app.controller("IndexController", function($scope){
    $scope.projects = [
        {name:"Langtons Ant", relativePath:"/static/html/LangtonsAnt.html"}
    ];
    $scope.email_part1 = "klee.ut";
    $scope.email_part2 = " at ";
    $scope.email_part3 = "gmail.com";

});