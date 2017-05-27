import { val } from "kamboja"
import { mongoose } from "kamboja-mongoose"

export class CustomerModel {

  @val.required()
  @val.type("string")
  nome:string

  @val.email()
  @val.required()
  @val.type("string")
  email:string

  @val.required()
  @val.type("string")
  password:string

  @val.required()
  @val.type("date")
  nascimento:Date

  @val.type("string")
  imagem:string

  @val.type("date")
  createdAt:Date
  
  @val.type("date")
  updatedAt:Date
}