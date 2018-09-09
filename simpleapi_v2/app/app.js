'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
var cors = require('cors');

const listData = require('./data/listData');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'))

const routes = require('./routes/routes.js')(app);

const server = app.listen(8114, function () {
    console.log('Listening on port %s...', server.address().port);
});

module.exports = app;
