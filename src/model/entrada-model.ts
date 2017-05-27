import { val } from "kamboja"
import * as mongoose from "mongoose"

export class EntradaModel {

  @val.required()
  @val.type("string")
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }

  @val.required()
  @val.type("number")
  valor:number

  @val.required()
  @val.type("string")
  titulo:string

  @val.type("string")
  descricao:string

  @val.required()
  @val.type("date")
  data:Date
  
  @val.type("date")
  createdAt:Date
  
  @val.type("date")
  updatedAt:Date
}