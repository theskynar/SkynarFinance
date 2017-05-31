import { TaskOdm, CustomerOdm, EntradaOdm, DespesaOdm } from '../model/mongoose-odm'
import { TaskModel } from '../model/task-model'
import * as cron from 'node-cron'

export class TaskService {

  tasks: TaskModel[] = []
  tasksRodando = []
  existeErro: Boolean = false

  constructor() {
  
    TaskOdm.find()
      .exec()
      .then(data => {
        this.tasks = data
        this.init()
      })
      .catch(err => {
        console.error(err)
        this.existeErro = true
      })
  }

  private init() {

    this.tasks.forEach(item => {
      this.tasksRodando.push({
        id: item._id,
        task: this.createTask(item),
        model: item
      })

    })
  }

  public addTask(item: TaskModel) {
    let self = this;
    return new Promise((resolve, reject) => {

      new TaskOdm(item).save()
        .then(data => {
          if(!data) throw new Error("Erro ao cadastrar task")

          self.tasks.push(data)
          self.tasksRodando.push({
            id: data._id,
            task: self.createTask(data),
            model: data
          })
            
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })

    })
  }

  public removeTask(id) {
    let self = this
    return new Promise((resolve, reject) => {

      let item = self.tasksRodando.filter(item => item.id == id)[0]
      if(!item || !item.task) return reject(new Error("Task não encontrada"))

      TaskOdm.findByIdAndRemove(id)
        .then(data => {
          let indexRodando = self.tasksRodando.indexOf(item)
          let indexTasks = self.tasks.indexOf(item.model)

          if(data.ativo) 
            self.tasksRodando[indexRodando].task.stop()

          self.tasks.splice(indexTasks, 1)
          self.tasksRodando.splice(indexRodando, 1)

          resolve(data)
        })
        .catch(reject)

    })
  }

  public stopTask(id) {
    let self = this
    return new Promise((resolve, reject) => {

      let item = self.tasksRodando.filter(item => item.id == id)[0]
      if(!item || !item.task || !item.model.ativo) return reject(new Error("Essa task não esta ativa"))

      TaskOdm.findByIdAndUpdate(id, {$set: {ativo: false}}).exec()
        .then(data => {
          let indexRodando = self.tasksRodando.indexOf(item)
          let indexTasks = self.tasks.indexOf(item.model)

          self.tasks[indexTasks] = data
          self.tasksRodando[indexRodando].model.ativo = false
          self.tasksRodando[indexRodando].task.stop()

          resolve(data)
        })
        .catch(reject)
      
    })
  }

  public startTask(id) {
    let self = this
    return new Promise((resolve, reject) => {

      let item = self.tasksRodando.filter(item => item.id == id)[0]
      if(!item || !item.task || item.model.ativo) return reject(new Error("Essa task esta ativa"))

      TaskOdm.findByIdAndUpdate(id, {$set: {ativo: true}}).exec()
        .then(data => {
          let indexRodando = self.tasksRodando.indexOf(item)
          let indexTasks = self.tasks.indexOf(item.model)

          self.tasks[indexTasks] = data
          self.tasksRodando[indexRodando].model.ativo = true
          self.tasksRodando[indexRodando].task.start()

          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      
    })
  }

  private createTask(item: TaskModel) {
      let timePorMes = 2678400000
      let limiteMaximo = (timePorMes * item.tempo) - 259200000

      let data = new Date(item.diaMes)
      let time = data.getTime()
      let dia = data.getDate()

      let task = cron.schedule(`1 0 0 ${dia} * *`, () => {

        let timeAtual = new Date().getTime()  

        let lancamento = {
          customer: item.customer,
          titulo: item.titulo,
          descricao: item.descricao,
          data: new Date(),
          valor: item.valor
        }

        if(item.tipo == 'entrada')
          new EntradaOdm(lancamento).save()
            .then()
            .catch(err => console.error(err))

        else if(item.tipo == 'despesa')
          new DespesaOdm(lancamento).save()
            .then()
            .catch(err => console.error(err))

        
        if((timeAtual - time >= limiteMaximo) && item.tempo > 0) this.stopTask(item._id)

      }, item.ativo)

      return task
  }


}