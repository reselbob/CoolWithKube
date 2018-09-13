'use strict';
const _ = require('lodash');
let superTest = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const ip = require('ip');

const testEnv = require('./testEnv');


let app = null;

before(() => {
    if(!testEnv.isContainerTest){
        app = require('../app');
        superTest = superTest(app)
    }else {
        superTest = superTest(testEnv.testUrl)
    }
});

after(() => {
    if(app) app.shutdown();
})

describe('API Tests: ', () => {
    it('Can get feelings API', function (done) {
        //Go get all the lists

        superTest.get(`/feelings`)
            .set('Accept', 'application/json')
            .then((res) => {
                //inspect the response (res)
                if (res.statusCode !== 200) throw new Error(res.text);
                //const listNames = [];
                const rslt = JSON.parse(res.text);
                expect(rslt).to.be.an('object');
                expect(rslt.data).to.be.an('array');
                done();

            })
            .catch(done);
    });

    it('Can get ping API', function (done) {
        //Go get all the lists

        superTest.get(`/ping`)
            .set('Accept', 'application/json')
            .then((res) => {
                //inspect the response (res)
                if (res.statusCode !== 200) throw new Error(res.text);
                //const listNames = [];
                const rslt = JSON.parse(res.text);
                expect(rslt).to.be.an('object');
                expect(rslt.interfaces).to.be.an('array');
                expect(rslt.interfaces[0].ipaddress).to.be.an('string');
                assert.isTrue(ip.isV4Format(rslt.interfaces[0].ipaddress) || ip.isV6Format(rslt.interfaces[0].ipaddress));
                console.log(JSON.stringify(rslt));
                done();

            })
            .catch(done);
    });


});