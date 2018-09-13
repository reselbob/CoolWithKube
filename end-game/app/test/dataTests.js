'use strict';
const _ = require('lodash');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const state = require('../data/state');

describe('Data Tests: ', () => {
    it('Can write state', function (done) {
        const obj = {name: "glad", value:10, username:"topDoggy"};
        state.save(obj)
            .then(rslt => {
                expect(rslt).to.be.an('object');
                done();
            })
            .catch(done);
    });

    it('Can get state', function (done) {
        const obj = {name: "glad", value:10, username:"reselbob"};
        state.save(obj)
            .then(rslt => {
                return state.get('reselbob')
            })
            .then(rslt => {
                expect(rslt).to.be.an('array');
                expect(rslt.length).to.be.greaterThan(0);
                done();
            })
            .catch(done);
    });

    it('Cannot get state', function (done) {
        state.get('doggy')
            .then(rslt => {
                expect(rslt).to.be.an('array');
                expect(rslt.length).to.equal(0);
                done();
            })
            .catch(done);
    });


});