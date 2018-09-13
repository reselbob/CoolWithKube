'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const PORT = process.env.FEELING_PORT || '3000';

const data = require('./data/feelings');



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//This is the routing javascript file
const routes = require('./routes/routes.js')(app);
app.use(express.static(path.join(__dirname, 'static')));

// make the feelings data global as an environment variable
process.env['feelingsData'] = JSON.stringify(data);

//initialize the states.json
const statesFileSpec = path.join(__dirname, 'data') + '/states.json';
if(! fs.existsSync(statesFileSpec)){
    fs.writeFileSync(statesFileSpec, '[]');
}


const server = app.listen(PORT, function () {
    console.log('Listening on port %s...', server.address().port);
});

app.shutdown = function (){
    server.close();
}

module.exports = app;
