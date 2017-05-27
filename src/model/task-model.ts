import { val } from "kamboja"
import * as mongoose from "mongoose"

export class TaskModel {

  _id?: String

  @val.required()
  @val.type("string")
  customer: String

  @val.required()
  @val.type("date")
  diaMes: Date

  @val.type("number")
  tempo: number

  @val.required()
  @val.type("string")
  tipo: String

  @val.required()
  @val.type("string")
  titulo: String

  @val.required()
  @val.type("string")
  descricao: String

  @val.required()
  @val.type("number")
  valor: number

  @val.required()
  @val.type("boolean")
  ativo: Boolean
}