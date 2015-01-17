var logger = require('log4js').getLogger();
var pg = require('pg');
var conString = "postgres://kleeut:Password1@localhost/kleeut";

var heroMan = new HeroManager();

module.exports = {
    heroManager: heroMan
};


function HeroManager(){
    var selectAllheroes = "SELECT * FROM TestTable";
    this.upsertHero = function(hero){
        var insertString = "INSERT INTO TestTable VALUES ('Jeff','new york','ROE');";
    };
    this.loadAllHeroes = function(callback){
        pg.connect(conString, function(err, client, done){
            if(err){
                logger.ERROR("Could not access database");
                callback(err);
            }
           client.query(selectAllheroes, function(err, result){
               if(err){
                   logger.ERROR("Could not select all Heroes");
                   callback(err);
               }
               console.log(result.rows);
               callback(false, result.rows);
           })
        });

    };
}