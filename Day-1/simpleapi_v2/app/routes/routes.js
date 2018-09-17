'use strict';
var os = require('os');
const factory = require('../data/dataFactory');
const appRouter = function (app) {

    app.get("/ping", function (req, res) {
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
        const vers = process.env.CURRENT_VERSION || 'Unknown';
        res.send(JSON.stringify({APIVersion: vers, createTime: new Date(), interfaces}));
    });

    app.get("/lists", function (req, res) {
        const lst = factory.getList();
        res.send(JSON.stringify(lst));
    });

    app.get("/processor", function (req, res) {
        const passedValue = req.query.value;
        const userId = req.query.userId;
        res.send(JSON.stringify({createTime: new Date(), userId, passedValue}));
    });

    app.get("/lists/:name", function (req, res) {
        const name = req.params.name;
        const lst = factory.getList(name);
        res.send(JSON.stringify(lst));
    });

    app.get("/login", function (req, res) {
        //See if the request is from Postman. iIf not, the value will be null
        const postmanToken = req.header('postman-token');

        //Create a response, no matter the the username and password received

        //If the header property, postman-token, has been sent in the request header,
        //return the request headers
        if (postmanToken) {
            res.send({url: req.originalUrl, headers: req.headers});
        } else {
            const message = 'Congratulations! You are logged in.';
            res.send(message);
        }
    });
}

module.exports = appRouter;