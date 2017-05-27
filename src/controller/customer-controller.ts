import { ApiController, Core, val } from 'kamboja'
import { CustomerModel } from '../model/customer-model'
import { CustomerOdm } from '../model/mongoose-odm'

export namespace v1 {

  export class CustomerController extends ApiController {

    get(id: string){
      return CustomerOdm.findById(id).exec()
    }

    add(@val.type("CustomerModel, model/customer-model") customer: CustomerModel){
      console.log(customer)
      return new CustomerOdm(customer).save()
    }

    delete(id: string){
      return CustomerOdm.findByIdAndRemove(id).exec()
    }

  }
  
}