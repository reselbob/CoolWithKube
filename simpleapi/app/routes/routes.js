'use strict';
const factory = require('../data/dataFactory');
const appRouter = function(app) {

    app.get("/lists", function(req, res) {
        const lst = factory.getList();
        res.send(JSON.stringify(lst));
    });

    app.get("/processor", function(req, res) {
        const passedValue = req.query.value;
        const userId = req.query.userId
        res.send(JSON.stringify({createTime: new Date(), userId, passedValue}));
    });

    app.get("/lists/:name", function(req, res) {
        const name = req.params.name;
        const lst = factory.getList(name);
        res.send(JSON.stringify(lst));
    });

    app.get("/login", function(req, res) {
        //See if the request is from Postman. iIf not, the value will be null
        const postmanToken = req.header('postman-token');

        //Create a response, no matter the the username and password received

        //If the header property, postman-token, has been sent in the request header,
        //return the request headers
        if(postmanToken){
            res.send({url: req.originalUrl, headers: req.headers});
        }else{
            const message = 'Congratulations! You are logged in.';
            res.send(message);
        }
    });
}

module.exports = appRouter;