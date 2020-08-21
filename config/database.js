
var mongoose = require('mongoose');
var settings = require('./settings');
var logger = require('./logger')(settings);
var Promise = require('promise');

module.exports = function () {
    mongoose.connect(settings.mongoUrl, {
        // useMongoClient: true
    });
    mongoose.Promise = Promise;
    mongoose.set('debug', settings.isMongoDebug);

    mongoose.connection.on('connected', function () {
        logger.info('Mongoose! Connected at ' + settings.mongoUrl);
    });

    mongoose.connection.on('disconnected', function () {
        logger.info('Mongoose! Disconnected em ' + settings.mongoUrl);
    });

    mongoose.connection.on('error', function (erro) {
        logger.info('Mongoose! Error : ' + erro);
    });

    process.on('SIGINT', function () {
        if (process.env.IN_TEST) {
                for(var table in mongoose.connection.collections){
                        logger.info(`Droping ${table}...`);
                        mongoose.connection.collections[table].drop(function (error) {
                    logger.info('Mongoose! Error in drop test : ' + error);
                });
            }
        }
        mongoose.connection.close(function () {
            logger.info('Mongoose! Disconnected by the application');
            process.exit(0);
        });
    });
};
