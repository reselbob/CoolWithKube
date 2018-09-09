'use strict';

const listData = require('./listData');
/*
Method for delivering data to the API
 */
module.exports.getList = function getList(name) {
    let obj;
    const nm = name !=null ? name.toLowerCase() : null;
    if(!nm) return listData;
    for (const prop in listData) {
        if(prop === nm)return {name:nm, list: listData[prop]}
    }
    return {name: 'unknown', list: null};
}