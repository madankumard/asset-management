import {Injectable} from "@angular/core";
import {Subject, throwError} from "rxjs";
import {AccountModel} from "./account.model";
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {SharedService} from "../shared/shared.service";

@Injectable({providedIn: "root"})
export class AccountService {

  accountChanged = new Subject<AccountModel>();
  private account: AccountModel;

  constructor(private http: HttpClient,
              private router: Router,
              private sharedService: SharedService) {
  }

  setAccount(accountModel: AccountModel) {
    this.account = accountModel;
    console.log("setted account in service taxId and taxType " + this.account.taxId + " " + this.account.taxType);
    this.accountChanged.next(this.account);
  }

  getAccount() {
    return this.account;
  }

  saveAccount() {
    return this.http.post(
      "http://localhost:8080/api/account/save",
      this.account
    ).pipe(catchError(this.sharedService.handleError), tap(resData => {
      console.log(resData);
    }))
  }

  getAccountDetails() {
    return this.http.get<AccountModel>(
      "http://localhost:8080/api/account/getAccountDetails",
      {
        params: {
          accountId: this.account.accountId
        }
      })
      .pipe(catchError(this.sharedService.handleError), tap(resData => {
        console.log("resData account: "+ resData);
        this.account = resData;
        this.accountChanged.next(this.account);
      }))
  }

}
