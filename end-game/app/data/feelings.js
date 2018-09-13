'use strict';
module.exports = (function () {
    const feelingsData = [
        {name: "glad", value:10},
        {name: "sad", value:10},
        {name: "mad", value:15},
        {name: "afraid", value: 12},
        {name: "trepidatious", value:2},
        {name: "amused", value: 5}

    ];

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
        traveseNodeSync(feelingsData);
    }
    checkForErrors();

    if (errs.length > 0) throw new Error(errs);

    return feelingsData;
})();