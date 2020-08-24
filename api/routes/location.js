module.exports = function (app) {
    var controller = app.controllers.location;

    app.route('/api/v1/info')
        .post(controller.add);

    app.route('/api/v1/location/:device_id')
        .get(controller.getById);
}