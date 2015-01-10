var http = require('http');
var server = http.createServer();
var url = require('url');
var provider = require('./static/StaticResourceProvider');

var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: './logs/SandBox.log',
            maxLogSize: 1024,
            backups:10
        }
    ]
});

var logger = log4js.getLogger();
var requestMap = {
    'favicon.ico':favIcon,
    'static':staticTextResourceResponder,
    "":indexResponseHandler,
    "query":handleQuery
};
server.on('request', function(request, response){
    try {

        var requestUrl = url.parse(request.url);
        var pathName = requestUrl.pathname;

        logger.debug("Received request for path: " + pathName);

        var pathComponents = getPathComponents(pathName);
        var pathToRespondTo = pathComponents[0];
        var responder;

        logger.debug(pathToRespondTo + pathComponents.toString());
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
            logger.debug(message);
        } else {
            responder(request, response);
        }
    }catch(err){
        logger.error("error processing request " + request);
        logger.error(err);
        response.writeHead(500);
        response.end("Exception occured return to <a href='/'>home</a>");
    }
});

server.listen(process.env.PORT || 5000);

function favIcon(request, response){
    var resourceName = "/static/img/avatars/avatar.ico";
    provider.respondWithResource(resourceName, response);
}

function staticTextResourceResponder(request, response){
    var requestUrl = url.parse(request.url);
    var pathName = requestUrl.pathname;
    provider.respondWithResource(pathName, response);
}

function indexResponseHandler(request, response){
    logger.debug("index page handler");
    provider.respondWithResource("/static/html/Index.html", response);
}

function getPathComponents(path){
    return path.substring(1,path.length).split("/");
}

function handleQuery(request, response){
    response.end(JSON.stringify( [
        { "Name" : "Alfred Pennyworth", "City" : "Gotahm", "Country" : "DC"},
        { "Name" : "Oliver Queen", "City" : "Starling City", "Country" : "DC"},
        { "Name" : "Barry Allen", "City" : "Central City", "Country" : "DC"},
        { "Name" : "Tony Stark", "City" : "USA", "Country" : "Marvel"}

    ]));
}

