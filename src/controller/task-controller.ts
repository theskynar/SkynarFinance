import { Controller, interceptor, http, val, JsonActionResult } from 'kamboja'
import { TaskModel } from '../model/task-model'
import { TaskOdm } from '../model/mongoose-odm'
import Auth from '../interceptor/auth-interceptor'

export namespace v1 {

  @interceptor.add(new Auth())
  @http.root('tarefas')
  export class TaskController extends Controller {

    @http.get('')
    list() {

      let customer = this.request.user._id
      if(!customer) return new JsonActionResult(null, 401, null)
      return TaskOdm.find({customer}).exec()
        .then(data => this.json(data, 200))
        .catch(err => this.json(err, 500))
    }

    @http.post('')
    add() {
      let task: TaskModel = this.request.body
      let data = task.diaMes.toString().split('/')
      task.diaMes = new Date(parseInt(data[2]), parseInt(data[1]) - 1, parseInt(data[0]))
      return global['taskService'].addTask(task)
        .then(data => this.json(data, 200))
        .catch(err => this.json(err, 500))
    }

    @http.delete(':id')
    delete(id: string){
      return global['taskService'].removeTask(id)
        .then(data => this.json(data, 200))
        .catch(err => this.json(err, 500))
    }

    @http.put('play/:id')
    play(id: string) {
      let taskId = id || this.request.body.id
      return global['taskService'].startTask(taskId)
        .then(data => this.json(data, 200))
        .catch(err => this.json(err, 500))
    }

    @http.put('stop/:id')
    stop(id: string) {
      let taskId = id || this.request.body.id
      return global['taskService'].stopTask(taskId)
        .then(data => this.json(data, 200))
        .catch(err => this.json(err, 500))
    }


  }
  
}