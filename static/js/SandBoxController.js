var app = angular.module("SandBoxApp", []);
app.controller("SandBoxController", function($scope){
    $scope.projects = [
        {name:"Langtons Ant", relativePath:"/static/html/LangtonsAnt.html", description:"A simple zero player game created in the process of learning more about the basics of Angular JS."},
        {name:"Blog", relativePath:"http://kleeut.blogspot.com.au/", description:"An experiment in practicing writing and documenting what I've been learning."}
    ];
});