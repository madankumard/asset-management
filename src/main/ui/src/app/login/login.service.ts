import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {SharedService} from "../shared/shared.service";

export interface SignUpResponseData {
  message: string
}

export interface LoginResponseData {
  accessToken: string,
  tokenType: string,
  id: string,
  username: string,
  email: string,
  expirationDateMs: number,
  roles: [],
  message?: string
}

@Injectable({providedIn: 'root'})
export class LoginService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private sharedService: SharedService) {
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<SignUpResponseData>(
      "http://localhost:8080/api/auth/signup",
      {
        "username": name,
        "email": email,
        "password": password,
        "role": ["admin"]
      }).pipe(catchError(this.sharedService.handleError), tap(resData => {
      console.log(resData);
    }))
  }

  login(name: string, password: string) {
    return this.http.post<LoginResponseData>(
      "http://localhost:8080/api/auth/signin",
      {
        "username": name,
        "password": password
      }).pipe(catchError(this.sharedService.handleError), tap(resData => {
      console.log(resData);
      this.handleAuthentication(resData.email,
        resData.id,
        resData.accessToken,
        +resData.expirationDateMs);
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(email, userId, token, expirationDate);
    console.log("User: " + user.token);
    this.user.next(user);
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    //this.router.navigate(['/login']);
    window.location.href = "/login";
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin() {
    console.log("in auto login");
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    console.log("userData: " + userData);
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(loadedUser);
      this.autoLogout(expirationDuration);
    }

  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}
