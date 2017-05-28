import { Core, ViewActionResult } from "kamboja"

export default class RouteInterceptor implements Core.RequestInterceptor {
    async intercept(invocation: Core.Invocation):Promise<Core.ActionResult> {
        if(invocation.hasController() || invocation.url.href.match("static"))  return invocation.execute()
        return new ViewActionResult({}, 'home/index', null)
    }
}