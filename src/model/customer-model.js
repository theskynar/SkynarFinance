"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const kamboja_1 = require("kamboja");
class CustomerModel {
}
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("string")
], CustomerModel.prototype, "nome", void 0);
__decorate([
    kamboja_1.val.email(),
    kamboja_1.val.required(),
    kamboja_1.val.type("string")
], CustomerModel.prototype, "email", void 0);
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("string")
], CustomerModel.prototype, "password", void 0);
__decorate([
    kamboja_1.val.required(),
    kamboja_1.val.type("date")
], CustomerModel.prototype, "nascimento", void 0);
__decorate([
    kamboja_1.val.type("string")
], CustomerModel.prototype, "imagem", void 0);
__decorate([
    kamboja_1.val.type("date")
], CustomerModel.prototype, "createdAt", void 0);
__decorate([
    kamboja_1.val.type("date")
], CustomerModel.prototype, "updatedAt", void 0);
exports.CustomerModel = CustomerModel;
