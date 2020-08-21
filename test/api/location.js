var request = require('supertest');
var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect;
var server = require('../../server');
// var settings = require('../../config/settings');
// var jwtHelper = require('custom-helper').jwtHelper(settings);

describe('api - location', function(){
    // var userTest = {
    //     "userId": "f0785ec93d4a",
    //     "nickName": "User 1",
    //     "email": "mail@mail.tst",
    //     "password": "a39352dcb0fc",
    //     "avatar": ""
    // };
    // var userToken = jwtHelper.createToken(userTest, settings);

    before(function () {
    });

    after(function () {
        server.close();
    });

    describe('/v1/location/:device_id', function(){
        let url = '/v1/location/';

        it('Should return error when not send id.', function () {
            return request(server)
                .get(url)
                // .set('X-Authorization', 'Bearer ' + userToken)
                .set('Accept', 'application/json')
                .expect(404);
        });

        it('Should return error when send an invalid device id.', function () {
            return request(server)
                .get(url + '000000000')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .set('Accept', 'application/json')
                .expect(400)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Device not found.");
                });
        });

        // it('Should find games in wait.', function(){
        //     return request(server)
        //         .get(url + '/in-wait')
        //         .set('X-Authorization', 'Bearer ' + userToken)
        //         .set('Accept', 'application/json')
        //         .expect(200)
        //         .then(r => {
        //             expect(r.body.length).to.be.equal(0);
        //         });
        // });

        // it('Should error when enjoy there is not a game in wait.', function () {
        //     return request(server)
        //         .patch(url)
        //         .set('Accept', 'application/json')
        //         .set('X-Authorization', 'Bearer ' + userToken)
        //         .expect(404)
        //         .then(r => {
        //             expect(r.body).to.be.equal("There are no game available.");
        //         });
        // });

        // it('Should create new game.', function(){
        //     return request(server)
        //         .post(url)
        //         .set('Accept', 'application/json')
        //         .set('X-Authorization', 'Bearer ' + userToken)
        //         .expect(201)
        //         .then(r => {
        //             expect(r.body.length).to.not.equal(0);
        //             gameInSession = r.body;
        //             expect(gameInSession.users.length).to.be.equal(1);
        //             return request(server)
        //                 .get(url + '/in-wait')
        //                 .set('X-Authorization', 'Bearer ' + userToken)
        //                 .set('Accept', 'application/json')
        //                 .expect(200)
        //         })
        //         .then(r2 => {
        //             expect(r2.body.length).to.be.equal(1);
        //         })
        // });

        // it('Should error when enjoy again with created game for this user.', function () {
        //     return request(server)
        //         .patch(url)
        //         .set('Accept', 'application/json')
        //         .set('X-Authorization', 'Bearer ' + userToken)
        //         .expect(404)
        //         .then(r => {
        //             expect(r.body).to.be.equal("There are no game available.");
        //         });
        // });

        // it('Should create new game again.', function () {
        //     return request(server)
        //         .post(url)
        //         .set('Accept', 'application/json')
        //         .set('X-Authorization', 'Bearer ' + userToken)
        //         .expect(201)
        //         .then(r => {
        //             expect(r.body.length).to.not.equal(0);
        //             gameInSession = r.body;
        //             expect(gameInSession.users.length).to.be.equal(1);
        //             return request(server)
        //                 .get(url + '/in-wait')
        //                 .set('X-Authorization', 'Bearer ' + userToken)
        //                 .set('Accept', 'application/json')
        //                 .expect(200)
        //         })
        //         .then(r2 => {
        //             expect(r2.body.length).to.be.equal(1);
        //         });
        // });
    });


    describe('/v1/info', function(){
        let url = '/v1/info/';

        it('Should return error when not send package.', function(){
            return request(server)
                .post(url)
                .send("")
                .set('Content-Type', 'text/plain')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .expect(400)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Invalid package.");
                })
        });

        it('Should return error when send an invalid package length.', function(){
            return request(server)
                .post(url)
                .send("0")
                .set('Content-Type', 'text/plain')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .expect(400)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Invalid package.");
                })
        });

        it('Should return error when send an invalid start and end.', function(){
            return request(server)
                .post(url)
                .send("0000000000000000")
                .set('Content-Type', 'text/plain')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .expect(400)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Invalid package.");
                })
        });

        it('Should return error when send an invalid start.', function(){
            return request(server)
                .post(url)
                .send("000000000000000073C4")
                .set('Content-Type', 'text/plain')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .expect(400)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Invalid package.");
                })
        });

        it('Should return error when send an invalid end.', function(){
            return request(server)
                .post(url)
                .send("50F70000000000000000")
                .set('Content-Type', 'text/plain')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .expect(400)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Invalid package.");
                })
        });

        it('Should add new package.', function(){
            return request(server)
                .post(url)
                .send("50F7000000000000000073C4")
                .set('Content-Type', 'text/plain')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .expect(201)
                .then(r => {
                    expect(r.body.length).to.not.equal(0);
                    console.log(r.body);
                    // gameInSession = r.body;
                    // expect(gameInSession.users.length).to.be.equal(1);
                    // return request(server)
                    //     .get(url + '/in-wait')
                    //     .set('X-Authorization', 'Bearer ' + userToken)
                    //     .set('Accept', 'application/json')
                    //     .expect(200)
                })
                // .then(r2 => {
                //     expect(r2.body.length).to.be.equal(1);
                // })
        });
    });
});