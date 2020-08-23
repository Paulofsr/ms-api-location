var request = require('supertest');
var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect;
var server = require('../../server');

describe('api - location', function(){

    before(function () {
    });

    after(function () {
        server.close();
    });

    describe('/v1/location/:device_id', function(){
        it('Should return error when not send id.', function () {
            return request(server)
                .get('/v1/location/')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .set('Accept', 'application/json')
                .expect(404);
        });

        it('Should return error when send an invalid device id.', function () {
            return request(server)
                .get('/v1/location/000000000')
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
        it('Should return error when not send package.', function(){
            return request(server)
                .post('/v1/info/')
                .send({})
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .expect(400)
        });

        // it('Should return error when send an invalid package length.', function(){
        //     return request(server)
        //         .post(url)
        //         .send("0")
        //         .set('Content-Type', 'text/plain')
        //         // .set('X-Authorization', 'Bearer ' + userToken)
        //         .expect(400)
        //         .then(r => {
        //             expect(r.body).to.have.property('message');
        //             expect(r.body.message).to.be.equal("Invalid package.");
        //         })
        // });

        // it('Should return error when send an invalid start and end.', function(){
        //     return request(server)
        //         .post(url)
        //         .send("0000000000000000")
        //         .set('Content-Type', 'text/plain')
        //         // .set('X-Authorization', 'Bearer ' + userToken)
        //         .expect(400)
        //         .then(r => {
        //             expect(r.body).to.have.property('message');
        //             expect(r.body.message).to.be.equal("Invalid package.");
        //         })
        // });

        // it('Should return error when send an invalid start.', function(){
        //     return request(server)
        //         .post(url)
        //         .send("000000000000000073C4")
        //         .set('Content-Type', 'text/plain')
        //         // .set('X-Authorization', 'Bearer ' + userToken)
        //         .expect(400)
        //         .then(r => {
        //             expect(r.body).to.have.property('message');
        //             expect(r.body.message).to.be.equal("Invalid package.");
        //         })
        // });

        // it('Should return error when send an invalid end.', function(){
        //     return request(server)
        //         .post(url)
        //         .send("50F70000000000000000")
        //         .set('Content-Type', 'text/plain')
        //         // .set('X-Authorization', 'Bearer ' + userToken)
        //         .expect(400)
        //         .then(r => {
        //             expect(r.body).to.have.property('message');
        //             expect(r.body.message).to.be.equal("Invalid package.");
        //         })
        // });

        it('Should return error when send an invalid data in Package.', function(){
            return request(server)
                .post('/v1/info/')
                .send({
                    "deviceId_Hex": "ASDFKJLKJL",
                    "deviceId": "99999999",
                    "commandType": "02",
                    "subPackage": "23423423JKJ23KJ4HKJH234",
                    "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(417)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Invalid data in Package.");
                });
        });

        it('Should return error when send without data in Package.', function(){
            return request(server)
                .post('/v1/info/')
                .send({
                    "deviceId_Hex": "ASDFKJLKJL",
                    "deviceId": "99999999",
                    "commandType": "02",
                    "subPackage": "",
                    "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(417)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Invalid data in Package.");
                });
        });

        it('Should return error when send without data in Package.', function(){
            return request(server)
                .post('/v1/info/')
                .send({
                    "deviceId_Hex": "ASDFKJLKJL",
                    "deviceId": "99999999",
                    "commandType": "02",
                    "subPackage": "",
                    "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(417)
                .then(r => {
                    expect(r.body).to.have.property('message');
                    expect(r.body.message).to.be.equal("Invalid data in Package.");
                });
        });

        it('Should add new package.', function(){
            return request(server)
                .post('/v1/info/')
                .send({
                    "deviceId_Hex": "ASDFKJLKJL",
                    "deviceId": "99999999",
                    "commandType": "02",
                    "subPackage": "5EFCF95000000000084000008CA0F8003C013026A1029E72BD",
                    "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(204);
        });

        it('Should add new package.', function(){
            return request(server)
                .post('/v1/info/')
                .send({
                    "deviceId_Hex": "ASDFKJLKJL",
                    "deviceId": "99999999",
                    "commandType": "02",
                    "subPackage": "5EFCF950156F017D784000008CA0F8003C013026A1029E72BD",
                    "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .expect(204);
        });

        it('Should return data of deviceId added.', function () {
            return request(server)
                .get('/v1/location/99999999')
                // .set('X-Authorization', 'Bearer ' + userToken)
                .set('Accept', 'application/json')
                .expect(200)
                .then(r => {
                    expect(r.body).to.have.property('deviceId');
                    expect(r.body.deviceId).to.be.equal("99999999");
                });
        });
    });
});