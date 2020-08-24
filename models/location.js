var mongoose = require('mongoose');

var model = null;

module.exports = function () {

    var Location = mongoose.Schema({
        deviceId: { type: String, require: true },
        info: {
            date: Date,
            direction: Number,
            distance: Number,
            delayReport: Number,
            composition: {
                complet: String,
                GPSFixed: Number,
                GPSHistoric: Number,
                ignitionOn: Number,
                latitudeNegative: Number,
                longitudeNegative: Number
            },
            velocity: Number,
            latitude: Number,
            longitude: Number
        },
        package: { type: String, require: true },
        date: { type: Date, require: true }
    });
    Location.index({ deviceId: 1, date: -1});

    model = model ? model : mongoose.model('Locations' + (process.env.IN_TEST ? 'Test' : ''), Location);

    return model;
};