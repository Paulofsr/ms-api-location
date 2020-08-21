var mongoose = require('mongoose');

var model = null;

module.exports = function () {

    var Location = mongoose.Schema({
        deviceId: { type: String, require: true },
        info: {
            date: String,
            direaction: String,
            distance: String,
            delayReport: String,
            composition: {
                completOriginal: String,
                completConverted: String,
                GPSFixed: Number,
                GPSHistoric: Number,
                ignitionOn: Number,
                latitudeNegative: Number,
                longitudeNegative: Number,
            },
            velocity: String,
            latitude: String,
            logintude: String
        },
        package: { type: String, require: true },
        date: { type: Date, require: true }
    });

    model = model ? model : mongoose.model('Locations' + (process.env.IN_TEST ? 'Test' : ''), Location);

    return model;
};