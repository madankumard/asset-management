import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {Observable, Subscription} from "rxjs";
import {LoginResponseData, LoginService, SignUpResponseData} from "./login.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AlertComponent} from "../shared/alert/alert.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  signUpSuccessMsg: string = null;

  @ViewChild(PlaceholderDirective, {static: false})
  alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private loginService: LoginService,
              private router: Router,

              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.clearMsg();
    this.isLoginMode = !this.isLoginMode;
  }

  clearMsg() {
    this.error = null;
    this.signUpSuccessMsg = null;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(loginForm: NgForm) {
    this.clearMsg();
    if (!loginForm.valid) {
      return;
    }

    const name = loginForm.value.name;
    const password = loginForm.value.password;

    let loginObs: Observable<SignUpResponseData | LoginResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      loginObs = this.loginService.login(name, password);
    } else {
      const email = loginForm.value.email;
      loginObs = this.loginService.signup(name, email, password);
    }

    loginObs.subscribe({
        next: resData => {
          if (!this.isLoginMode && resData.message) {
            this.signUpSuccessMsg = resData.message;
          }
          if(this.isLoginMode){
            this.router.navigate(['/dashboard']);
          }
          this.isLoading = false;
        },
        error: errorMessage => {
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        }
      }
    );

    loginForm.reset();
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
