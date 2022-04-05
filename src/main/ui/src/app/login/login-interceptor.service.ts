import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {exhaustMap, take} from "rxjs/operators";
import {LoginService} from "./login.service";

@Injectable()
export class LoginInterceptorService implements HttpInterceptor{

  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loginService.user.subscribe();

    return this.loginService.user.pipe(
      take(1),
      exhaustMap(user => {

        if(!user){
          return next.handle(req);
        }

        const reqHeaders = new HttpHeaders({
          'Authorization': `Bearer `+user.token
        });
        const modifiedReq = req.clone({headers: reqHeaders})
        return next.handle(modifiedReq);
      }));
  }
}
