var log = require('log4js').getLogger();
//var pg = require('pg');
//var conString = "postgres://kleeut:Password1@localhost/kleeut";

var heroMan = new HeroManager();
var heroes = [];
module.exports = {
    heroManager: heroMan
};


function HeroManager(){
    var selectAllheroes = "SELECT * FROM TestTable";
    this.insertHero = function(hero){
        heroes.push(hero);
        return; // todo: Hook this into heroku

        //var insertString = "INSERT INTO TestTable VALUES ('"+ hero.name+ "','" + hero.city + "','" + hero.universe + "');";
        //pg.connect(conString, function(err, client, done){
        //    done();
        //    if(err){
        //        log.ERROR("Could not access database");
        //        callback(err);
        //    }
        //    client.query(insertString, function(err, result){
        //        if(err){
        //            log.ERROR("Error saving " + hero.toString() + " to the database " + err.toString());
        //            callback(err);
        //        }
        //        callback(false);
        //    })
        //});
    };
    this.loadAllHeroes = function(callback){
        callback(false, heroes);
        //pg.connect(conString, function(err, client, done){
        //    if(err){
        //        log.ERROR("Could not access database");
        //        callback(err);
        //    }
        //   client.query(selectAllheroes, function(err, result){
        //       if(err){
        //           log.ERROR("Could not select all Heroes");
        //           callback(err);
        //       }
        //       console.log(result.rows);
        //       callback(false, result.rows);
        //   });
        //    done();
        //});
    //
    };
}