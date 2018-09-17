const http = require('http');
const port = 8130;
let i = 0;
const stooge = 'Moe';
const handleRequest = function(request, response) {
    const str = `I am ${stooge} at ${new Date()}, run number ${i++} \n`;
    console.log(`Received request for URL: ${request.url} data ${str}`);
    response.writeHead(200);
    response.end(str);
}
const www = http.createServer(handleRequest);
www.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});