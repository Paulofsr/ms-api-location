
var settings = require('../../config/settings');
settings.mongoUrl = "mongodb://localhost/books";
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/books')
var dbConnected = mongoose.connection.readyState == 1 || mongoose.connection.readyState == 2;
if(dbConnected) {
    var request = require('supertest');
    var chai = require('chai');
    var chaiSubset = require('chai-subset');
    chai.use(chaiSubset);
    var expect = chai.expect;
    var server = require('../../server');

    describe('api - location', function(){

        before('connect', function(){
            return mongoose.createConnection('mongodb://localhost/books')
        })

        before(function () {
        });

        after(function () {
            server.close();
        });

        describe('/api/v1/location/:device_id', function(){
            it('Should return error when not send id.', function () {
                return request(server)
                    .get('/api/v1/location/')
                    .set('Accept', 'application/json')
                    .expect(404);
            });

            if(dbConnected){
                it('Should return error when send an invalid device id.', function () {
                    return request(server)
                        .get('/api/v1/location/000000000')
                        .set('Accept', 'application/json')
                        .expect(400)
                        .then(r => {
                            expect(r.body).to.have.property('message');
                            expect(r.body.message).to.be.equal("Device not found.");
                        });
                });
            }
        });


        describe('/api/v1/info', function(){
            it('Should return error when not send package.', function(){
                return request(server)
                    .post('/api/v1/info/')
                    .send({})
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect(400)
            });

            it('Should return error when send an invalid data in Package.', function(){
                return request(server)
                    .post('/api/v1/info/')
                    .send({
                        "deviceId": "99999999",
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
                    .post('/api/v1/info/')
                    .send({
                        "deviceId": "99999999",
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
                    .post('/api/v1/info/')
                    .send({
                        "deviceId": "99999999",
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

            if(dbConnected){
                it('Should add new package.', function(){
                    return request(server)
                        .post('/api/v1/info/')
                        .send({
                            "deviceId": "99999999",
                            "subPackage": "5EFCF95000000000084000008CA0F8003C013026A1029E72BD",
                            "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
                        })
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .expect(204);
                });

                it('Should add new package.', function(){
                    return request(server)
                        .post('/api/v1/info/')
                        .send({
                            "deviceId": "99999999",
                            "subPackage": "5EFCF950156F017D784000008CA0F8003C013026A1029E72BD",
                            "package": "JHQK4H2K3J4H2KJH4KJ23H4JK23H4"
                        })
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .expect(204);
                });

                it('Should return data of deviceId added.', function () {
                    return request(server)
                        .get('/api/v1/location/99999999')
                        // .set('X-Authorization', 'Bearer ' + userToken)
                        .set('Accept', 'application/json')
                        .expect(200)
                        .then(r => {
                            expect(r.body).to.have.property('deviceId');
                            expect(r.body.deviceId).to.be.equal("99999999");
                        });
                });
            }
        });
    });
} else {
    console.log('######### DB Disconnected!')
}