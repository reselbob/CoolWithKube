'use strict';

const app = require('../app');

module.exports = {
    isLocal: process.env.IS_LOCAL || null,
    isContainerTest: process.env.IS_CONTAINER_TEST || null,
    testPort: process.env.PORT || '3000',
    testUrl: app.PORT
}