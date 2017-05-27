import { Controller, http } from 'kamboja'
import { CustomerModel } from '../model/customer-model'
import { CustomerOdm } from '../model/mongoose-odm'
import * as jwt from "jsonwebtoken"

export namespace v1 {

  export class LoginController extends Controller {

    @http.post()
    auth(){
      let usuario = this.request.body

      if(!usuario.email || !usuario.password) 
        return this.json({message: "Email e senha são obrigatórios"}, 400)

      return CustomerOdm.findOne(usuario)
        .exec()
        .then(customer => {
          let tokenContent = {_id: customer._id, nome: customer.nome, email: customer.email}
          var token = jwt.sign(tokenContent, "SAHgsAHSGaJSA&SA", {expiresIn: "1d"})
          return this.json({ok: true, body: customer, token})
        })
        .catch(err => this.json(err, 500))
    }

  }
}