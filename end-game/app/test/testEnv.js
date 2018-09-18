'use strict';

module.exports = {
    isLocal: process.env.IS_LOCAL || null,
    isContainerTest: process.env.IS_CONTAINER_TEST || null,
    testUrl: process.env.TEST_HOST || 'http://localhost:3000'
}