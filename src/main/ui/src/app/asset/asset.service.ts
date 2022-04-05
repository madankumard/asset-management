import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AccountService} from "../account/account.service";
import {Subscription, tap, throwError} from "rxjs";
import {SharedService} from "../shared/shared.service";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class AssetService {

  accountId: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private accountService: AccountService,
              private sharedService: SharedService) {
    if (this.accountService.getAccount()) {
      this.accountId = this.accountService.getAccount().accountId;
    }
  }

  saveAssets(assets: []) {
    return this.httpClient.post("http://localhost:8080/api/asset/save",
      assets, {
        params: {
          accountId: this.accountId
        },
        responseType: 'text'
      }).pipe(catchError(this.sharedService.handleError), tap(resData => {
        console.log(resData)
      })
    );
  }


}
