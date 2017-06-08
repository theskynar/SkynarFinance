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
ExpressApp.use(express.static('www'))
ExpressApp.set('views', __dirname + '/view')
ExpressApp.set("view engine", "hbs")

let kamboja = new Kamboja(new ExpressEngine(ExpressApp), {
    rootPath: __dirname,
    showConsoleLog: true,
    interceptors: [new RouteInterceptor()]
});

Mongoose.connect(process.env.MONGOOSE_URI, err => {
    if(err) console.log(err);
});
(<any>Mongoose).Promise = global.Promise

let app = kamboja.init()

export { app }
