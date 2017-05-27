"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const kamboja_1 = require("kamboja");
const mongoose_odm_1 = require("../model/mongoose-odm");
const auth_interceptor_1 = require("../interceptor/auth-interceptor");
var v1;
(function (v1) {
    let TaskController = class TaskController extends kamboja_1.Controller {
        list() {
            let customer = this.request.user._id;
            return mongoose_odm_1.TaskOdm.find().exec()
                .then(data => this.json(data, 200))
                .catch(err => this.json(err, 500));
        }
        add() {
            let task = this.request.body;
            return global['taskService'].addTask(task)
                .then(data => this.json(data, 200))
                .catch(err => this.json(err, 500));
        }
        delete(id) {
            return global['taskService'].removeTask(id)
                .then(data => this.json(data, 200))
                .catch(err => this.json(err, 500));
        }
        play(id) {
            let taskId = id || this.request.body.id;
            return global['taskService'].startTask(taskId)
                .then(data => this.json(data, 200))
                .catch(err => this.json(err, 500));
        }
        stop(id) {
            let taskId = id || this.request.body.id;
            return global['taskService'].stopTask(taskId)
                .then(data => this.json(data, 200))
                .catch(err => this.json(err, 500));
        }
    };
    __decorate([
        kamboja_1.http.get('')
    ], TaskController.prototype, "list", null);
    __decorate([
        kamboja_1.http.post('')
    ], TaskController.prototype, "add", null);
    __decorate([
        kamboja_1.http.delete(':id')
    ], TaskController.prototype, "delete", null);
    __decorate([
        kamboja_1.http.put('play/:id')
    ], TaskController.prototype, "play", null);
    __decorate([
        kamboja_1.http.put('stop/:id')
    ], TaskController.prototype, "stop", null);
    TaskController = __decorate([
        kamboja_1.interceptor.add(new auth_interceptor_1.default()),
        kamboja_1.http.root('tarefas')
    ], TaskController);
    v1.TaskController = TaskController;
})(v1 = exports.v1 || (exports.v1 = {}));
