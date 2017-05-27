import * as Mongoose from "mongoose"
import { MongooseHelper } from "kamboja-mongoose"
import { EntradaModel } from "./entrada-model"
import { DespesaModel } from "./despesa-model"
import { CustomerModel } from "./customer-model"
import { TaskModel } from "./task-model"


const EntradaOdm = MongooseHelper.getInstance()
    .createModel<EntradaModel>("Entrada")

const DespesaOdm = MongooseHelper.getInstance()
    .createModel<DespesaModel>("Despesa")

const CustomerOdm = MongooseHelper.getInstance()
    .createModel<CustomerModel>("Customer")

const TaskOdm = MongooseHelper.getInstance()
    .createModel<TaskModel>("Task")
    

export { EntradaOdm, DespesaOdm, CustomerOdm, TaskOdm }