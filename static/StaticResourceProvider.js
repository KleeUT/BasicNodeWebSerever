var logger = require('log4js').getLogger();
module.exports =  {
    respondWithResource: function (queryPath, response){
        logger.trace("Reading from " + queryPath);
        sendFileContentsAsResponse("." + queryPath, response);
    }
};

function sendFileContentsAsResponse(fileName, response){
    var fs = require('fs');

    if(fs.existsSync(fileName)){
        response.writeHead(200);
        require('fs').createReadStream(fileName).pipe(response);
    }else{
        response.writeHead(404);
        logger.warn("404 - could not locate resource for path " + fileName);
    }
}