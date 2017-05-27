"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kamboja_1 = require("kamboja");
class RouteInterceptor {
    intercept(invocation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (invocation.hasController)
                return invocation.execute();
            return new kamboja_1.ViewActionResult({}, 'index', null);
        });
    }
}
exports.default = RouteInterceptor;
