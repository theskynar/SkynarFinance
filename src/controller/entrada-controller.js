"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const kamboja_1 = require("kamboja");
const mongoose_odm_1 = require("../model/mongoose-odm");
const auth_interceptor_1 = require("../interceptor/auth-interceptor");
var v1;
(function (v1) {
    let EntradaController = class EntradaController extends kamboja_1.ApiController {
        list() {
            const customer = this.request.user._id;
            if (!customer)
                return new kamboja_1.JsonActionResult(null, 401, null);
            return mongoose_odm_1.EntradaOdm.find({ customer }).populate({ path: 'customer', model: mongoose_odm_1.CustomerOdm }).exec();
        }
        get(id) {
            return mongoose_odm_1.EntradaOdm.findById(id).populate({ path: 'customer', model: mongoose_odm_1.CustomerOdm }).exec();
        }
        add(entrada) {
            return new mongoose_odm_1.EntradaOdm(entrada).save();
        }
        delete(id) {
            return mongoose_odm_1.EntradaOdm.findByIdAndRemove(id).exec();
        }
    };
    __decorate([
        kamboja_1.http.get('')
    ], EntradaController.prototype, "list", null);
    __decorate([
        __param(0, kamboja_1.val.type("EntradaModel, model/entrada-model"))
    ], EntradaController.prototype, "add", null);
    EntradaController = __decorate([
        kamboja_1.interceptor.add(new auth_interceptor_1.default())
    ], EntradaController);
    v1.EntradaController = EntradaController;
})(v1 = exports.v1 || (exports.v1 = {}));
