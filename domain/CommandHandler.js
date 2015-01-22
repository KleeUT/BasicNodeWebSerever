var dataAccess = require("../dataAccess/dataAccess.js");
var log = require("log4js");
module.exports = {
    createHero:createHeroHandler
};

function createHeroHandler(hero){
    var errors = [];
    if(hero.name == undefined){
        errors.push("Must have a name")
    }
    if(hero.city == undefined){
        errors.push("Must have a city")
    }
    if(hero.universe == undefined){
        errors.push("Must have a universe")
    }
    if(errors.length == 0) {
        dataAccess.heroManager.insertHero(hero);
    }else{
        log.warn("Errors creating hero " + hero.toString() + " : " + errors.toString())
    }
}

function test(){

}