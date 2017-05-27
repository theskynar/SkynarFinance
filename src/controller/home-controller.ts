import { Controller, http } from "kamboja"

export class HomeController extends Controller {

    index() {
        return this.view({ title: "Kamboja" })
    }
}