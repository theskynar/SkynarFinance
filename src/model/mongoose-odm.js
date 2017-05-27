"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kamboja_mongoose_1 = require("kamboja-mongoose");
const EntradaOdm = kamboja_mongoose_1.MongooseHelper.getInstance()
    .createModel("Entrada");
exports.EntradaOdm = EntradaOdm;
const DespesaOdm = kamboja_mongoose_1.MongooseHelper.getInstance()
    .createModel("Despesa");
exports.DespesaOdm = DespesaOdm;
const CustomerOdm = kamboja_mongoose_1.MongooseHelper.getInstance()
    .createModel("Customer");
exports.CustomerOdm = CustomerOdm;
const TaskOdm = kamboja_mongoose_1.MongooseHelper.getInstance()
    .createModel("Task");
exports.TaskOdm = TaskOdm;
