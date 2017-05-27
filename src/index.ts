import { Kamboja, Core } from "kamboja"
import { ExpressEngine } from "kamboja-express"

import * as express from "express"
import * as Mongoose from "mongoose"
import * as BodyParser from "body-parser"
import * as cors from "cors"

import RouteInterceptor from './interceptor/error-interceptor'

let ExpressApp = express()
ExpressApp.use(BodyParser.json())
ExpressApp.use(cors())
ExpressApp.set("view engine", "hbs")

let kamboja = new Kamboja(new ExpressEngine(ExpressApp), {
    rootPath: __dirname,
    showConsoleLog: true
});

Mongoose.connect("mongodb://mbordin:bordin98@ds061188.mlab.com:61188/tserp", err => {
    if(err) console.log(err);
});
(<any>Mongoose).Promise = global.Promise

let app = kamboja.init()

export { app }
