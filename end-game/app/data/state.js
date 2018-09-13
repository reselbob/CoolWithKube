'use strict';
const fs = require('fs');
const statesFileSpec = __dirname + '/states.json';
const _ = require('lodash');

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

module.exports.save = function saveStates(userData) {
    //get the file
    return getData(statesFileSpec)
        .then(data => {
            const arr = JSON.parse(data);
            userData.createDate = new Date();
            arr.push(userData);
            return writeData(statesFileSpec, JSON.stringify(arr))
        })
        .then(rslt => {
            return {message: 'OK'};
        })
};

module.exports.get = function (username) {
    return getData(statesFileSpec)
        .then(data => {
            const arr = JSON.parse(data);
            return _.filter(arr, {'username': username});
        });
};