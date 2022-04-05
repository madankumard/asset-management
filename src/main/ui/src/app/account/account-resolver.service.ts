import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AccountModel} from "./account.model";
import {Observable} from "rxjs";
import {AccountService} from "./account.service";

@Injectable({providedIn: "root"})
export class AccountResolverService implements Resolve<AccountModel>{

  constructor(private accountService: AccountService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountModel> | Promise<AccountModel> | AccountModel {
    return this.accountService.getAccountDetails();
  }
}
