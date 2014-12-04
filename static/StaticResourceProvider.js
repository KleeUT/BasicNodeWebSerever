module.exports =  {
    respondWithResource: function (queryPath, response){
        console.log("Reading from " + queryPath);
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
        console.log("404 - could not locate resource for path " + fileName);
    }
    return;

    fs.readFile(fileName, function(err, contents){
        if(!err){
            response.end(contents);
        }else{
            response.writeHead(500);
            console.log("error " + err);
            console.dir(err);
            response.end();
        }
    });
}