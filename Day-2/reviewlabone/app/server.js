const http = require('http');
const fs = require('fs');
const os = require('os');
let i = 0;
const handleRequest = function(request, response) {
    let interfaces = [];
    const ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                interfaces.push({ifname: ifname + ':' + alias, ipaddress: iface.address})
                //console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                interfaces.push({ifname: ifname, ipaddress: iface.address})
                //console.log(ifname, iface.address);
            }
            ++alias;
        });
    });
    const vers = process.env.CURRENT_VERSION || 'Unknown Version';
    const author = process.env.AUTHOR || 'Unknown Author';
    response.writeHead(200);
    response.end(JSON.stringify({ProcessId: process.pid, Author: author, APIVersion: vers, createTime: new Date(), interfaces}));
}
const server = http.createServer(handleRequest);
server.listen(8121, ()=>{
    console.log('Review Lab One is listening on port %s...', server.address().port);
});
