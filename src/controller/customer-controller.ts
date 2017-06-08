import { ApiController, Core, val } from 'kamboja'
import { CustomerModel } from '../model/customer-model'
import { CustomerOdm } from '../model/mongoose-odm'
import * as Crypt from "node-crypt"

let crypto = new Crypt({key: process.env.CRYPT_HASH})

export namespace v1 {

  export class CustomerController extends ApiController {

    get(id: string){
      return CustomerOdm.findById(id).exec()
    }

    add(@val.type("CustomerModel, model/customer-model") customer: CustomerModel){
      let nascimento = customer.nascimento.toString().split('/')
      customer.password = crypto.encrypt(customer.password)

      customer.nascimento = new Date(parseInt(nascimento[2]), parseInt(nascimento[1]) - 1, parseInt(nascimento[0]))
      return new CustomerOdm(customer).save()
    }

    delete(id: string){
      return CustomerOdm.findByIdAndRemove(id).exec()
    }

  }
  
}