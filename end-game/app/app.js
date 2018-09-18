'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');


const state = require('./data/state');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//This is the routing javascript file
const routes = require('./routes/routes.js')(app);
app.use(express.static(path.join(__dirname, 'static')));

//set the feelings values
const data = require('./data/feelings');

// make the feelings data global as an environment variable
process.env['feelingsData'] = JSON.stringify(data);

//initialize the states.json
state.initSync();

const port = process.env.FEELING_TRACKER_PORT || 3000;

const server = app.listen(port, function () {
    console.log('Listening on port %s...', server.address().port);
});

app.shutdown = function (){
    server.close();
}

module.exports = app;
