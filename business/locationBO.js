var logger      = require('../config/logger')(require('../config/settings'));
var mongoose    = require('mongoose');
var locations = require('../models/location')();
var locationHelper = require('../helpers/locationHelper')();

module.exports = function () {
    return {
        getById: function (id) {
            logger.info(`[business-locationBO] Getting a location by id: ${id}`);
            return new Promise(function (resolve, reject) {

                if (!id) {
                    logger.error('[business-locationBO] The id informed is not valid on gtById method.', id);
                    reject({
                        "status": 400,
                        "message": "The device informed is not valid."
                    });
                }
                locations.find({ deviceId: id })
                    .exec()
                    .then(function (result) {
                        logger.info('[business-locationBO] Location found: ', result)
                        if (result.length == 0) {
                            logger.info('[business-locationBO] Location not found');
                            reject({
                                "status": 400,
                                "message": "Device not found."
                            });
                        } else {
                            resolve(result[0]);
                        }
                    }, function (erro) {
                        logger.log('error', '[business-locationBO] An error has occurred while geeting a location by id %s', id, erro);
                        reject({
                            "status": 500,
                            "message": "Internal error."
                        });
                    });

            });
        },

        add: function (package) {
            logger.info('[business-locationBO] Start add location.');
            return new Promise(function (resolve, reject) {
                locationHelper.preReadPackage(package)
                    .then(
                        function(preData){
                            logger.info('[business-locationBO] Valid package!');
                            let location = {
                                deviceId: preData.deviceId,
                                info: {
                                    date: "111",
                                    direaction: "111",
                                    distance: "111",
                                    delayReport: "111",
                                    composition: {
                                        completOriginal: "111",
                                        completConverted: "111",
                                        GPSFixed: "111",
                                        GPSHistoric: "111",
                                        ignitionOn: "111",
                                        latitudeNegative: "111",
                                        longitudeNegative: "111",
                                    },
                                    velocity: "111",
                                    latitude: "111",
                                    logintude: "111"
                                },
                                package: preData.package,
                                date: new Date()
                            }
                            try{
                            locations.create(location)
                                .then(function (nlocation) {
                                    logger.info('[business-locationBO] The location has been added successfully.');
                                    resolve(nlocation);
                                }, function (erro) {
                                    logger.error('[business-locationBO] An error has ocurred while adding a location.', erro);
                                    reject({
                                        "status": 500,
                                        "message": "Internal error."
                                    });
                                })
                                .catch(function(e){
                                    logger.error('[business-locationBO] An error has ocurred while adding a location.', erro);
                                    reject(e);
                                })
                            } catch (e){
                                reject(e);
                            }

                        }, function (erro) {
                            logger.error('[business-locationBO] ERROR! ', erro);
                            reject(erro);
                        }//,
                        // reject
                    )
            });
        }
    };
};
