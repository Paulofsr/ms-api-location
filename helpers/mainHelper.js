
var DateHelper = require('./dateHelper');
var HashHelper = require('./hashHelper');
// var JWTHelper = require('./jwtHelper');

module.exports = {
    getHelper: function (helper, logger) {
        switch (helper) {
            case 'hash':
                return HashHelper;
            case 'date':
                return new DateHelper(logger);
        }
    }
};