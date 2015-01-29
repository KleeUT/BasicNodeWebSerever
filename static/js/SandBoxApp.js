var app = angular.module("SandBoxApp", []);
app.controller("IndexController", function($scope){
    this.description = "none";
    $scope.projects = [
        {name:"Langtons Ant", relativePath:"/static/html/sandbox/LangtonsAnt.html", description:"A simple zero player game created in the process of learning more about the basics of Angular JS."},
        {name:"Blog", relativePath:"http://kleeut.blogspot.com.au/", description:"An experiment in practicing writing and documenting what I've been learning."},
        {name:"Command and Query Test", relativePath:"/static/html/sandbox/CommandQueryTest.html"},
        {name:"My Sweet Estimator", relativePath:"/static/html/sandbox/Estimator.html", description:"An all purpose, fool proof, tool for estimating any task"},
        {name:"NCGAU random selector", relativePath:"/ncgau", description:""}
    ];
});