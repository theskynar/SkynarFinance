"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kamboja_1 = require("kamboja");
class HomeController extends kamboja_1.Controller {
    index() {
        return this.view({ title: "Kamboja" });
    }
}
exports.HomeController = HomeController;
