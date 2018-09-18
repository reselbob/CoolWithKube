'use strict';
const fs = require('fs');

const _ = require('lodash');
const path = require('path');

function getStatesFileSpecSync(){
    const dir =  process.env.FEELING_TRACKER_DATA_DIR || __dirname;
    return path.join(dir) + '/feelingstates.json';
}

function getData(fileName, type) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, type, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

function writeData(fileName, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileName, data, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

module.exports.initSync = function (){
    // set the path to the
    const datadir = process.env.FEELING_TRACKER_DATA_DIR || __dirname;
    if(!process.env.FEELING_TRACKER_DATA_DIR) process.env.FEELING_TRACKER_DATA_DIR = datadir;
    if(!fs.existsSync(datadir))fs.mkdirSync(datadir);
    const statesFileSpec = path.join(datadir) + '/feelingstates.json';
    if(! fs.existsSync(statesFileSpec)){
        fs.writeFileSync(statesFileSpec, '[]');
    }
}

module.exports.save = function saveStates(userData) {
    //get the file
    return getData(getStatesFileSpecSync())
        .then(data => {
            const arr = JSON.parse(data);
            userData.createDate = new Date();
            arr.push(userData);
            return writeData(getStatesFileSpecSync(), JSON.stringify(arr))
        })
        .then(rslt => {
            return {message: 'OK'};
        })
};

module.exports.get = function (username) {
    return getData(getStatesFileSpecSync())
        .then(data => {
            const arr = JSON.parse(data);
            return _.filter(arr, {'username': username});
        });
};