import { Core, JsonActionResult } from "kamboja"
import * as jwt from "jsonwebtoken"

export default class AuthInterceptor implements Core.RequestInterceptor {
    async intercept(invocation: Core.Invocation):Promise<Core.ActionResult> {
        const token = invocation.request.getHeader('x-access-token')
        if(!token) 
            return new JsonActionResult({ message: "Usuário nao autenticado" }, 401, null)
        
        let decoded = jwt.verify(token, "SAHgsAHSGaJSA&SA");
        if(!decoded) 
            return new JsonActionResult({ message: "Token inválido" }, 401, null)

        invocation.request.user = decoded
        return invocation.execute()
    }
}