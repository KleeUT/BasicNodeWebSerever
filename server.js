var http = require('http');
var server = http.createServer();
var url = require('url');
var provider = require('./static/StaticResourceProvider');

server.on('request', function(request, response){
    try {
        var requestUrl = url.parse(request.url);
        var pathName = requestUrl.pathname;

        console.log("Received request for path: " + pathName);

        var pathComponents = getPathComponents(pathName);
        var pathToRespondTo = pathComponents[0];
        var responder;

        console.log(pathToRespondTo + pathComponents.toString());
        if (pathToRespondTo == undefined) {
            responder = requestMap[""]
        }
        else {
            responder = requestMap[pathToRespondTo];
        }

        if (responder == null || responder == undefined) {
            response.writeHead(404);
            var message = "Could not find responder for " + pathToRespondTo + ' it was ' + responder;
            response.end(message);
            console.log(message);
        } else {
            responder(request, response);
        }
    }catch(err){
        console.log("error processing request " + request);
        console.log(err);
        response.writeHead(500);
        response.end("Exception occured return to <a href='/'>home</a>");
    }
});

server.listen(8080);

function favIcon(request, response){
    var resourceName = "./favicon.ico";
    provider.respondWithResource(resourceName, response);
}

function staticTextResourceResponder(request, response){
    var requestUrl = url.parse(request.url);
    var pathName = requestUrl.pathname;
    provider.respondWithResource(pathName, response);
}

function indexResponseHandler(request, response){
    console.log("index page handler");
    provider.respondWithResource("/static/HelloWorld.html", response);
}

function getPathComponents(path){
    return path.substring(1,path.length).split("/");
}

