module.exports = function (app) {
    var controller = app.controllers.location;

    app.route('/v1/info')
        .post(controller.add);

    app.route('/v1/location/:device_id')
        .get(controller.getById);
}