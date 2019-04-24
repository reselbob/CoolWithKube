const http = require('http');
const fs = require('fs');
let i = 0;

const port = process.env.PORT || 8112;

const handleRequest = function(request, response) {
    const fname = '/mydata/test_file.txt';
    const str = `${i} as ${new Date()} for processId: ${process.pid} \n`;
    i++;
    fs.appendFileSync(fname, str, function (err) {
        if (err) {
            return console.log(err);
        }
    });
    console.log('Received request for URL: ' + request.url);
    const contents = fs.readFileSync(fname, 'utf8');
    response.writeHead(200);
    response.end(contents);
}
const www = http.createServer(handleRequest);
www.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});
