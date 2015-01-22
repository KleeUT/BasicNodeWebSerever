app.controller("CommandQueryTestController", function($scope, $http){
    $scope.allHeroes = [{name:"nope"}];
    resetHero();
    refreshHeroesList();

    $scope.saveHero = function(){
    sendCreateHeroCommand($scope.heroName, $scope.heroCity, $scope.heroUniverse);
    resetHero();
    };

    $scope.clearHero = function(){
        resetHero();
    };

    function resetHero(){
        $scope.heroName = "";
        $scope.heroCity = "";
        $scope.heroUniverse = "";
    }

    function refreshHeroesList() {
        $http.get("/query/allHeroes").success(function (response) {
            console.log(response);
            $scope.allHeroes = response;
        });
    }

    function sendCreateHeroCommand(name, city, universe){
        $http.post("/command/createHero",{name:name, city:city, universe:universe}).success(function(){
            window.location.reload(); // todo: push notifications
        });
    }

});