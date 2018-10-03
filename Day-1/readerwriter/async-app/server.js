const http = require('http');
const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const appendFileAsync = promisify(fs.appendFile);
let i = 0;
//Create an Async version of the request handler. It really is the right thing to do.
const handleRequest = function (request, response) {
    const res = response;
    const version = process.env.CURRENT_VERSION || 'UNKNOWN';
    const fname = 'test_file.txt';
    const str = `${i++} at ${new Date()} running async on version ${version}\n`;
    //const str = i++ + ' at ' + new Date() + ' running async\n';
    appendFileAsync(fname, str)
        .then((result) => {
            return readFileAsync(fname, {encoding: 'utf8'});
        })
        .then(result => {
            res.statusCode = 200;
            res.end(result);
        })
        .catch(err => {
            res.statusCode = 400;
            res.end(err);
        });
};
const www = http.createServer(handleRequest);
www.listen(8111, () => {
    console.log('Listening on port 8111');
});
