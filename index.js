const http = require('http');

const qs = require('querystring');

const te = require("./tengine");
te.setViewsDirectory("views", true);
te.addFile("views/pasted.htpl", "pasted");

const dumpProcessor = require("./dump-processor");
const getProcessor = require("./get-processor");

http.createServer((request, response) => {
    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    response.on('error', (err) => {
        console.error(err);
    });
    if (request.method === 'POST' && request.url === '/dump') {
        dumpProcessor(request, response);
        return;
    }
    // /get/id/ where id is any digit sequence
    const getPath = new RegExp(/\/get\/[_0-9]+\//)
    if (request.method === 'GET' && request.url.match(getPath)) {
        getProcessor(request, response);
        return;
    }
    // if (request.url.match(/echo/)) {
    //     request.pipe(response);
    //     return;
    // }
    te.render(request, response, "index");
}).listen(8080, () => {
    // console.log(1) 
});