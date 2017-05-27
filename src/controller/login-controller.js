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
const jwt = require("jsonwebtoken");
var v1;
(function (v1) {
    class LoginController extends kamboja_1.Controller {
        auth() {
            let usuario = this.request.body;
            if (!usuario.email || !usuario.password)
                return this.json({ message: "Email e senha são obrigatórios" }, 400);
            return mongoose_odm_1.CustomerOdm.findOne(usuario)
                .exec()
                .then(customer => {
                let tokenContent = { _id: customer._id, nome: customer.nome, email: customer.email };
                var token = jwt.sign(tokenContent, "SAHgsAHSGaJSA&SA", { expiresIn: "1d" });
                return this.json({ ok: true, body: customer, token });
            })
                .catch(err => this.json(err, 500));
        }
    }
    __decorate([
        kamboja_1.http.post()
    ], LoginController.prototype, "auth", null);
    v1.LoginController = LoginController;
})(v1 = exports.v1 || (exports.v1 = {}));
