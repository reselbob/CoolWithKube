const http = require('http');
const handleRequest = function(request, response) {
    const color = process.env.COLOR || 'UNKNOWN';
    const vers = process.env.CURRENT_VERSION || 'UNKNOWN';
    response.writeHead(200);
    response.end(JSON.stringify({color: color, ProcessId: process.pid, APIVersion: vers, createTime: new Date()}));
}
const server = http.createServer(handleRequest);
server.listen(8122, ()=>{
    console.log('Review Lab One is listening on port %s...', server.address().port);
});
