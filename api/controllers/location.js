// var settings = require('../../config/settings');
// var Logger = require('../../config/logger');
// var logger = new Logger(settings);
var logger      = require('../../config/logger')(require('../../config/settings'));
var locationBO  = require('../../business/locationBO')();

module.exports = function () {
    return {
        getById: function (req, res) {
            locationBO.getById(req.params.device_id)
            .then(function (location) {
                logger.debug('[controllers-locations] The getById return was:', location);
                res.status(200).json(location);
            }, function (error) {
                logger.error('[controllers-locations] An error has occurred ')
                res.status(error.status || 404).json(error);
            });
        },

        add: function (req, res) {
            logger.info('[controllers-locations] Adding a new location.');
            return locationBO.add(req.body)
                        .then(function (rAdd) {
                            logger.debug('[controllers-locations] Created a new location %s', rAdd);
                            // var token = req.headers['authorization'] ? req.headers['authorization'] : req.query.authorization;
                            // return updateVacation(res, rAdd, 201, '1', rAdd.user, "criação de Férias com sucesso.", token.split(' ')[1]);
                            res.status(201).json(rAdd);
                        })
                        .catch(function (error) {
                            logger.error('[controllers-locations] Error in add location', error);
                            res.status(error.status || 417).json(error);
                        });
        }
    };

};