import { ApiController, val, interceptor, http, JsonActionResult } from 'kamboja'
import { EntradaModel } from '../model/entrada-model'
import { EntradaOdm, CustomerOdm } from '../model/mongoose-odm'
import Auth from '../interceptor/auth-interceptor'

export namespace v1 {

  @interceptor.add(new Auth())
  export class EntradaController extends ApiController {

    @http.get('')
    list(){
      const customer = this.request.user._id
      if(!customer) return new JsonActionResult(null, 401, null)
      return EntradaOdm.find({customer}).populate({path: 'customer', model: CustomerOdm}).exec();
    }

    get(id: string){
      return EntradaOdm.findById(id).populate({path: 'customer', model: CustomerOdm}).exec()
    }

    add(@val.type("EntradaModel, model/entrada-model") entrada: EntradaModel){
      let data = entrada.data.toString().split('/')
      entrada.data = new Date(parseInt(data[2]), parseInt(data[1]) - 1, parseInt(data[0]))
      return new EntradaOdm(entrada).save()
    }

    delete(id: string){
      return EntradaOdm.findByIdAndRemove(id).exec()
    }

  }
  
}