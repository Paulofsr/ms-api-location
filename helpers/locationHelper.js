var logger      = require('../config/logger')(require('../config/settings'));
const start = "50F7";
const end = "73C4";
const deviceLength = 6;
const cmTypeLength = 2;


module.exports = function () {
    return {
        preReadPackage: function (package) {
            logger.info(`[business-locationHelper] Pre-reade: ${package}`);
            return new Promise(function (resolve, reject) {
                if(!package || package.length <= (start.length + end.length + deviceLength + cmTypeLength)){
                    logger.error('[business-locationHelper] Invalid package length.');
                    rejectInvalidPackage(reject);
                } else {
                    let pStart = package.substring(0, start.length);
                    let pEnd = package.substring(package.length - end.length);
                    if(pStart != start || pEnd != end){
                        logger.error('[business-locationHelper] Invalid star or/and end package.');
                        rejectInvalidPackage(reject);
                    } else {
                        resolve(getPreData(package));
                    }
                }
            });
        },

        readPackage: function (package) {
            logger.info(`[business-locationHelper] Getting a location by id: ${id}`);
            return new Promise(function (resolve, reject) {

                if (!id) {
                    logger.error('[business-locationHelper] The id informed is not valid on gtById method.', id);
                    reject({
                        "status": 400,
                        "message": "The device informed is not valid."
                    });
                }
                locations.find({ deviceId: id })
                    .exec()
                    .then(function (result) {
                        logger.info('[business-locationHelper] Location found: ', result)
                        if (result.length == 0) {
                            logger.info('[business-locationHelper] Location not found');
                            reject({
                                "status": 400,
                                "message": "Device not found."
                            });
                        } else {
                            resolve(result[0]);
                        }
                    }, function (erro) {
                        logger.log('error', '[business-locationHelper] An error has occurred while geeting a location by id %s', id, erro);
                        reject({
                            "status": 500,
                            "message": "Internal error."
                        });
                    });

            });
        },

        add: function (package) {
            logger.info('[business-locationHelper] Start add location.');
            return new Promise(function (resolve, reject) {
                let location = {
                    deviceId: "111",
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
                    package: package,
                    date: new Date()
                }
                try{
                    locations.create(location)
                        .then(function (nlocation) {
                            logger.info('[business-locationHelper] The location has been added successfully.');
                            resolve(nlocation);
                        }, function (erro) {
                            logger.error('[business-locationHelper] An error has ocurred while adding a location.', erro);
                            reject({
                                "status": 500,
                                "message": "Internal error."
                            });
                        })
                        .catch(function(e){
                            logger.error('[business-locationHelper] An error has ocurred while adding a location.', erro);
                            reject(e);
                        })
                } catch (e){
                    reject(e);
                }
            });
        }
    };
};


function rejectInvalidPackage(reject){
    reject({
        "status": 400,
        "message": "Invalid package."
    })
}

function getPreData(package){
    logger.info('[business-locationHelper] get pre-data.');
    let subPackage = package.substring(start.length, package.length - end.length);
    return {
        "deviceId": subPackage.substring(0, 6),
        "commandType": subPackage.substring(6, 2),
        "data": subPackage.substring(8),
        "package": package
    };
}