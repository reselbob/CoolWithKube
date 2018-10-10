const http = require('http');
const port = 8311;
let i = 0;
const handleRequest = function(request, response) {
    const str = `I am bad code 1, running at ${new Date()}. Make me good, please. By the way, I can count: ${i++} \n`;
    console.log(`Received request for URL: ${request.url} data ${str}`);
    response.writeHead(200);
    response.end(str);
}
const www = http.createServer(handleRequest);
www.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});