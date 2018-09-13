'use strict';
const _ = require('lodash');
const state = require('../data/state');
var os = require('os');

const appRouter = function(app) {

    app.get("/ping", function(req, res) {
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
                    interfaces.push({ifname:ifname + ':' + alias, ipaddress: iface.address})
                    //console.log(ifname + ':' + alias, iface.address);
                } else {
                    // this interface has only one ipv4 adress
                    interfaces.push({ifname:ifname, ipaddress: iface.address})
                    //console.log(ifname, iface.address);
                }
                ++alias;
            });
        });
        const vers = process.env.CURRENT_VERSION || 'Unknown'
        res.send(JSON.stringify({APIVersion: vers, createTime: new Date(), interfaces}));
    });

    app.post("/login", function(req, res) {
        const obj = req.body;
        if(req.body.password === 'cheese'){
            res.status(200).send({
                message: 'OK',
                username:req.body.username
            });
        }else{
            res.status(401).send({
                message: 'Unauthorized',
            });
        }
    });

    app.get("/state/:username", function(req, res) {
        const username = req.params.username;
        res.send(JSON.stringify({message:`Getting State for ${username}`}));
    });

    app.post("/state/", function(req, res) {
        const obj = req.body;
        state.save(obj)
        .then(rslt =>{
            res.statusCode = 200;
            res.send(JSON.stringify({message:rslt.message}));
        }).catch(rslt =>{
            res.statusCode = 400;
            res.send(JSON.stringify({message:rslt}));
        })
    });

    app.get("/feelings/", function(req, res) {
        const data = JSON.parse(process.env['feelingsData']);
        res.send(JSON.stringify({data}));
    });

    app.get("/feelings/:username", function(req, res) {
        const username = req.params.username;
        state.get(username)
            .then(rslt =>{
                res.statusCode = 200;
                res.send(JSON.stringify({data:rslt}));
            });
    });
};

module.exports = appRouter;