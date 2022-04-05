import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoginInterceptorService} from "./login/login-interceptor.service";
import {AccountService} from "./account/account.service";

@NgModule({
  providers: [AccountService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptorService,
    multi: true
  }]
})
export class CoreModule{

}
