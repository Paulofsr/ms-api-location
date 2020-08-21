var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');
var settings = require('./settings');
var ExpressHelper = require('../helpers/expressHelper');

module.exports = function () {
    var app = express();
    var expressHelper = new ExpressHelper();

    app.set('port', settings.servicePort);

    app.use(bodyParser.urlencoded({
        limit: '10mb',
        extended: true
    }));
    app.use(bodyParser.text({
        limit: '1mb'
    }));
    app.use(methodOverride());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(expressHelper.createLogger);
    app.use(expressHelper.parseCurrentUser);
    // app.use(mung.json(
    //     function transform(body, req) {
    //         // if (settings.logging.saveRequests && req.logger.currentUser) {
    //         //     logBO.save({
    //         //         message: req.originalUrl,
    //         //         level: 'HTTP',
    //         //         method: req.method,
    //         //         correlationId: req.logger.correlationId,
    //         //         userId: req.logger.currentUser.id,
    //         //         req: {
    //         //             headers: req.headers,
    //         //             body: req.body
    //         //         },
    //         //         res: body
    //         //     });
    //         // }

    //         return body;
    //     }
    // ));


    consign({
            cwd: 'api'
        })
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};