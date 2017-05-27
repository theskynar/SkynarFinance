import { ApiController, val, interceptor, http, JsonActionResult } from 'kamboja'
import { DespesaModel } from '../model/despesa-model'
import { DespesaOdm, CustomerOdm } from '../model/mongoose-odm'
import Auth from '../interceptor/auth-interceptor'

export namespace v1 {
  
  @interceptor.add(new Auth())
  export class DespesaController extends ApiController {

    @http.get('')
    list(){
      const customer = this.request.user._id
      if(!customer) return new JsonActionResult(null, 401, null)
      return DespesaOdm.find({customer}).populate({path: 'customer', model: CustomerOdm}).exec();
    }

    get(id: string){
      return DespesaOdm.findById(id).populate({path: 'customer', model: CustomerOdm}).exec()
    }

    add(@val.type("DespesaModel, model/despesa-model") despesa: DespesaModel){
      return new DespesaOdm(despesa).save()
    }

    delete(id: string){
      return DespesaOdm.findByIdAndRemove(id).exec()
    }

  }
  
}