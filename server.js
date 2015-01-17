var http = require('http');
var server = http.createServer();
var url = require('url');
var provider = require('./static/StaticResourceProvider');
var dataAccess = require('./dataAccess/dataAccess.js');
var commandHandler = require('./domain/CommandHandler.js');
var log4js = require('log4js');
log4js.configure({
    appenders: [
        {type: 'console'}
    ]
});

var log = log4js.getLogger();
var requestMap = {
    'favicon.ico': favIcon,
    'static': staticResourceResponder,
    "": indexResponseHandler,
    "query": handleQuery,
    "command": commandParser,
    "404": fourZeroFourResponder
};
server.on('request', function (request, response) {
    try {

        var requestUrl = url.parse(request.url);
        var pathName = requestUrl.pathname;

        log.debug("Received request for path: " + pathName);

        var pathComponents = getPathComponents(pathName);
        var pathToRespondTo = pathComponents[0];
        var responder;

        log.debug(pathToRespondTo + pathComponents.toString());
        if (pathToRespondTo == undefined) {
            responder = requestMap[""]
        }
        else {
            responder = requestMap[pathToRespondTo];
        }

        if (responder == null || responder == undefined) {
            log.warn("Could not find responder for " + pathToRespondTo + ' it was ' + responder);
            responder = requestMap["404"]
        }
        responder(request, response);
    } catch (err) {
        log.error("error processing request " + request);
        log.error(err);
        response.writeHead(500);
        response.end("<html>Exception occurred return to <a href='/'>home</a> <br />For more information check the logs</html>");
    }
});

server.listen(process.env.PORT || 5000);

function favIcon(request, response) {
    var resourceName = "/static/img/avatars/avatar.ico";
    provider.respondWithResource(resourceName, response);
}

function staticResourceResponder(request, response) {
    var requestUrl = url.parse(request.url);
    var pathName = requestUrl.pathname;
    provider.respondWithResource(pathName, response);
}

function indexResponseHandler(request, response) {
    log.debug("index page handler");
    provider.respondWithResource("/static/html/Index.html", response);
}

function getPathComponents(path) {
    return path.substring(1, path.length).split("/");
}

function handleQuery(request, response) {
    dataAccess.heroManager.loadAllHeroes(function (err, data) {
        if (err) {
            response.end("QueryFailure " + err.toString());
        }
        response.end(JSON.stringify(data));
    });
}

function commandParser(request, response) {
    if (request.method == "POST") {
        var requestUrl = url.parse(request.url);
        var rawPath = requestUrl.pathname;
        var secondSlash = rawPath.indexOf('/', 1);
        var command = rawPath.substring(secondSlash + 1, rawPath.length);
        var commandObject = JSON.parse(requestUrl.query);
        log.debug("Received " + command + " with data " + commandObject.toString());
        commandHandler[command](commandObject);
    } else {
        log.warn("Non post command received");
        response.end("Nope")
    }
}

function fourZeroFourResponder(request, response) {
    response.writeHead(404);
    provider.respondWithResource("/static/html/exceptions/FourOhFour.html", response);
}

