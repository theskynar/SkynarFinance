"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_odm_1 = require("../model/mongoose-odm");
const cron = require("node-cron");
class TaskService {
    constructor() {
        this.tasks = [];
        this.tasksRodando = [];
        this.existeErro = false;
        mongoose_odm_1.TaskOdm.find()
            .exec()
            .then(data => {
            this.tasks = data;
            this.init();
        })
            .catch(err => {
            console.error(err);
            this.existeErro = true;
        });
    }
    init() {
        this.tasks.forEach(item => {
            this.tasksRodando.push({
                id: item._id,
                task: this.createTask(item),
                model: item
            });
        });
    }
    addTask(item) {
        let self = this;
        return new Promise((resolve, reject) => {
            new mongoose_odm_1.TaskOdm(item).save()
                .then(data => {
                if (!data)
                    throw new Error("Erro ao cadastrar task");
                self.tasks.push(data);
                self.tasksRodando.push({
                    id: data._id,
                    task: self.createTask(data),
                    model: data
                });
                resolve(data);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    removeTask(id) {
        let self = this;
        return new Promise((resolve, reject) => {
            let item = self.tasksRodando.filter(item => item.id == id)[0];
            if (!item || !item.task)
                return reject(new Error("Task não encontrada"));
            mongoose_odm_1.TaskOdm.findByIdAndRemove(id)
                .then(data => {
                let indexRodando = self.tasksRodando.indexOf(item);
                let indexTasks = self.tasks.indexOf(item.model);
                if (data.ativo)
                    self.tasksRodando[indexRodando].task.stop();
                self.tasks.splice(indexTasks, 1);
                self.tasksRodando.splice(indexRodando, 1);
                resolve(data);
            })
                .catch(reject);
        });
    }
    stopTask(id) {
        let self = this;
        return new Promise((resolve, reject) => {
            let item = self.tasksRodando.filter(item => item.id == id)[0];
            if (!item || !item.task || !item.model.ativo)
                return reject(new Error("Essa task não esta ativa"));
            mongoose_odm_1.TaskOdm.findByIdAndUpdate(id, { $set: { ativo: false } }).exec()
                .then(data => {
                let indexRodando = self.tasksRodando.indexOf(item);
                let indexTasks = self.tasks.indexOf(item.model);
                self.tasks[indexTasks] = data;
                self.tasksRodando[indexRodando].model.ativo = false;
                self.tasksRodando[indexRodando].task.stop();
                resolve(data);
            })
                .catch(reject);
        });
    }
    startTask(id) {
        let self = this;
        return new Promise((resolve, reject) => {
            let item = self.tasksRodando.filter(item => item.id == id)[0];
            if (!item || !item.task || item.model.ativo)
                return reject(new Error("Essa task esta ativa"));
            mongoose_odm_1.TaskOdm.findByIdAndUpdate(id, { $set: { ativo: true } }).exec()
                .then(data => {
                let indexRodando = self.tasksRodando.indexOf(item);
                let indexTasks = self.tasks.indexOf(item.model);
                self.tasks[indexTasks] = data;
                self.tasksRodando[indexRodando].model.ativo = true;
                self.tasksRodando[indexRodando].task.start();
                resolve(data);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    createTask(item) {
        let data = new Date(item.diaMes);
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let intervalo = `${mes}-${mes + item.tempo}`;
        let task = cron.schedule(`1-59 * * * *`, () => {
            let lancamento = {
                customer: item.customer,
                titulo: item.titulo,
                descricao: item.descricao,
                data: new Date(),
                valor: item.valor
            };
            if (item.tipo == 'entrada')
                new mongoose_odm_1.EntradaOdm(lancamento).save()
                    .then()
                    .catch(err => console.error(err));
            else if (item.tipo == 'despesa')
                new mongoose_odm_1.DespesaOdm(lancamento).save()
                    .then()
                    .catch(err => console.error(err));
        }, item.ativo);
        return task;
    }
}
exports.TaskService = TaskService;
