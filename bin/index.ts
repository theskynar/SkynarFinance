#!/usr/bin/env node

require('dotenv').config()
import { app } from "../src"
import * as http from "http"
import {TaskService} from '../src/services/task-service'

let port = normalizePort(process.env.PORT || "5000");
app.set("port", port);
let server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    console.log("  [Kamboja] Listening on " + bind);
}

global['taskService'] = new TaskService()