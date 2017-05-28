"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const kamboja_1 = require("kamboja");
class TaskModel {
}
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("string")
], TaskModel.prototype, "customer", void 0);
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("date")
], TaskModel.prototype, "diaMes", void 0);
__decorate([
    kamboja_1.val.type("number")
], TaskModel.prototype, "tempo", void 0);
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("string")
], TaskModel.prototype, "tipo", void 0);
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("string")
], TaskModel.prototype, "titulo", void 0);
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("string")
], TaskModel.prototype, "descricao", void 0);
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("number")
], TaskModel.prototype, "valor", void 0);
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("boolean")
], TaskModel.prototype, "ativo", void 0);
exports.TaskModel = TaskModel;