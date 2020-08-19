var logger      = require('../config/logger')(require('../config/settings'));
var mongoose    = require('mongoose');
// var locations = require('../models/location')();

module.exports = function () {
    return {
        getById: function (id) {
            logger.info(`[business-locationBO] Getting a location by id: ${id}`);
            return new Promise(function (resolve, reject) {

                if (!mongoose.Types.ObjectId.isValid(id)) {
                    logger.error('[business-locationBO] The id informed is not valid on gtById method.', id);
                    reject('The id informed is not valid.');
                }
                // locations.findById(id)
                //     .exec()
                //     .then(function (location) {
                //         if (!location) {
                //             logger.log('info', '[business-locationBO] No location found');
                //         } else {
                //             logger.log('warn', '[business-locationBO] location was found');
                //         }
                //         resolve(location);
                //     }, function (erro) {
                //         logger.log('error', '[business-locationBO] An error has occurred while geeting a location by id %s', id, erro);
                //         reject(erro);
                //     });


                reject();
            });
        },

        add: function (location) {
            logger.info('[business-locationBO] Start add locationBO.');
            return new Promise(function (resolve, reject) {
                    // locations.count({}, function (error, count) {
                    //     // location["code"] = count + 1;
                    //     locations.create(location)
                    //         .then(function (nlocation) {
                    //             logger.log('info', '[business-locationBO] The location has been added successfully.');
                    //             resolve(nlocation);
                    //         }, function (erro) {
                    //             logger.log('error', '[business-locationBO] An error has ocurred while adding a location.', erro);
                    //             reject(erro);
                    //         });
                    // })


                reject();
            });
        }
    };
};
