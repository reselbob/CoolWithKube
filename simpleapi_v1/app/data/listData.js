'use strict';
module.exports = (function () {
    const listData = {
        stooges:['moe', 'larry', 'curly'],
        jetsons:['george', 'jane', 'judy', 'elroy'],
        flintstones:['fred', 'wilma', 'pebbles'],
        rubbles:['barney', 'betty', 'bambam'],
        beatles: ['john', 'paul', 'george', 'ringo'],
    };

    const errs = [];

    function traveseNodeSync(node) {
        for (let prop in node) {
            if (typeof node[prop] === 'object' && node[prop]) {
                traveseNodeSync(node[prop]);
            } else {
                if (typeof node[prop] === 'undefined') errs.push(`Missing required value for property ${prop}`);
            }
        }
    }

    function checkForErrors() {
        traveseNodeSync(listData);
    }
    checkForErrors();

    if (errs.length > 0) throw new Error(errs);

    return listData;
})();
