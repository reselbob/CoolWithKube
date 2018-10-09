const http = require('http');
let i = 0;
const port = 8115;
const handleRequest = function(request, response) {
    const appname = process.env.APP_NAME || 'Mr Echo';
    const echostr = process.env.APP_ECHO || 'UNKNOWN';

    const str = `${appname} says '${echostr} ' at ${new Date()}, run number ${i++} \n`;
    console.log(`Received request for URL: ${request.url} data ${str}`);
    response.writeHead(200);
    response.end(str);
}
const www = http.createServer(handleRequest);
www.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});
