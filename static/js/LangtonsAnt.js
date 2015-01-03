/**
 * Created by Klee on 12/24/2014.
 */
var app = angular.module("LangtonsAnt", []);
app.controller("LangtonsAntController", function($scope, $timeout){
    var timer;
    $scope.delay=50;
    $scope.pageName = "Langtons Ant";
    $scope.height = 25;
    $scope.width = 25;
    $scope.running = false;
    $scope.ant = new Ant(0, 0, "north");

    $scope.setUpBoard = function(){
        $scope.pauseGame();
        var width = Number($scope.width);
        $scope.board = [];
        $scope.board.push(wallRow(width + 2));
        fillBodyWithCells();
        $scope.board.push(wallRow(width + 2));

        $scope.ant = new Ant(Math.round($scope.width/2), Math.round($scope.height/2), 'north');
        $scope.board[$scope.ant.y][$scope.ant.x].contains = $scope.ant;
    };

    function fillBodyWithCells(){
        for(var rowNumber = 0; rowNumber<$scope.height; rowNumber ++){
            $scope.board.push(cellRow($scope.width));
        }
    }

    function cellRow(width){
        var row = [];
        row.push(new Wall());
        for(var cell = 0; cell<width; cell++){
            row.push(new Cell(false));
        }
        row.push(new Wall());
        return row;
    }

    function wallRow(width){
            var row = [];
            for(var i = 0; i<width; i++){
                row.push(new Wall());
            }
            return row;
    }

    function playMove() {
        var previousCell = {x: $scope.ant.x, y: $scope.ant.y};
        $scope.ant.move();
        var newCell = {x: $scope.ant.x, y: $scope.ant.y};
        $scope.ant.turn($scope.board[newCell.y][newCell.x]);
        $scope.board[newCell.y][newCell.x].invertActiveState();

        if ($scope.board[$scope.ant.y][$scope.ant.x].canContainAnt()) {
            $scope.board[previousCell.y][previousCell.x].contains = undefined;
            $scope.board[$scope.ant.y][$scope.ant.x].contains = $scope.ant;
        }
        else{
            $scope.ant.turn(newCell);
            $scope.ant.x = previousCell.x;
            $scope.ant.y = previousCell.y;
        }
        timer = $timeout(playMove, $scope.delay);
    }

    $scope.startGame = function(){
        $scope.running = true;
        timer = $timeout(playMove, $scope.delay);
    };

    $scope.pauseGame = function(){
        $scope.running = false;
        $timeout.cancel(timer);
    };

    $scope.setUpBoard();
});

function Cell(active, contains){
    this.active = active;
    this.contains = contains;

    this.isAWall = function(){
        return this.contains == "wall"
    };

    this.containsAnt = function(){
        return this.contains instanceof Ant;
    };

    this.invertActiveState = function(){
        this.active = !this.active;
    };

    this.canContainAnt = function(){
        return !(this.isAWall())
    }
}

function WalledBoard(x,y){

}

function Wall(){
    return new Cell(false, "wall");
}

function Ant(x, y, direction){
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.turn =function(cell){
        switch(this.direction){
            case "north": this.direction = cell.active ? "west" : "east"; break;
            case "east": this.direction = cell.active ? "north" : "south"; break;
            case "south": this.direction = cell.active ? "east" : "west"; break;
            case "west": this.direction = cell.active ? "south" : "north"; break;
        }
    };

    this.move = function(){
        switch(this.direction){
            case "north": this.y = this.y-1; break;
            case "east": this.x = this.x+1; break;
            case "south": this.y = this.y+1; break;
            case "west": this.x = this.x-1; break;
        }
    }
}