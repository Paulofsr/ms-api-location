var chai = require('chai');
var chaiSubset = require('chai-subset');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiSubset);
chai.use(chaiAsPromised);
var expect = chai.expect;
var locationBO  = require('../../business/locationBO')();
locationBO.locations = null;
var mongoose = require('mongoose');



describe('api - location', function(){

    before(function () {
    });

    after(function () {
    });


    describe('locationBO.getById', function(){
        it('Should return error when not send id.', function () {
            expect(locationBO.getById()).to.be.eventually.rejectedWith().and.have.property('message', "The device informed is not valid.");
        });

        it('Should return error when mongo is not connected.', function () {
            expect(locationBO.getById({})).to.be.eventually.rejectedWith().and.have.property('message', "Invalid id.");
        });
    });

    describe('locationBO.add', function(){
        it('Should return error when add with invalid data.', function () {
            expect(locationBO.add({ "deviceId": {}})).to.be.eventually.rejectedWith().and.have.property('message', "The device informed is not valid.");
        });
    });
});