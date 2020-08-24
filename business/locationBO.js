var logger      = require('../config/logger')(require('../config/settings'));
var locations = require('../models/location')();
var locationHelper = require('../helpers/locationHelper')

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
                locations.findOne({ deviceId: id })
                    .exec()
                    .then(function (result) {
                        logger.info('[business-locationBO] Location found: ', result)
                        if (!result || result.length == 0) {
                            logger.info('[business-locationBO] Location not found');
                            reject({
                                "status": 400,
                                "message": "Device not found."
                            });
                        } else {
                            resolve(result);
                        }
                    }, function (erro) {
                        logger.error(`[business-locationBO] An error has occurred while geeting a location by id ${id}: ${erro}`);
                        reject({
                            "status": 400,
                            "message": "Invalid id."
                        });
                    });

            });
        },

        add: function (preData) {
            logger.info('[business-locationBO] Start add location.');
            return new Promise(function (resolve, reject) {
                if(!preData || !preData.deviceId) {
                    logger.error('[business-locationBO] Invalid package.');
                    reject({
                        "status": 400,
                        "message": "Invalid package."
                    })
                }
                try{
                locations.create(locationHelper.getLocation(preData))
                    .then(function (nlocation) {
                        logger.info('[business-locationBO] The location has been added successfully.');
                        resolve(nlocation);
                    });
                } catch (e){
                    reject(e);
                }
            });
        }
    };
};

