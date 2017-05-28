"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kamboja_1 = require("kamboja");
const kamboja_express_1 = require("kamboja-express");
const express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const cors = require("cors");
const error_interceptor_1 = require("./interceptor/error-interceptor");
let ExpressApp = express();
ExpressApp.use(BodyParser.json());
ExpressApp.use(cors());
ExpressApp.use(express.static('www'));
ExpressApp.set('views', __dirname + '/view');
ExpressApp.set("view engine", "hbs");
let kamboja = new kamboja_1.Kamboja(new kamboja_express_1.ExpressEngine(ExpressApp), {
    rootPath: __dirname,
    showConsoleLog: true,
    interceptors: [new error_interceptor_1.default()]
});
Mongoose.connect("mongodb://mbordin:bordin98@ds061188.mlab.com:61188/tserp", err => {
    if (err)
        console.log(err);
});
Mongoose.Promise = global.Promise;
let app = kamboja.init();
exports.app = app;
