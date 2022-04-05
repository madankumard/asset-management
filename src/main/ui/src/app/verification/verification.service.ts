import {Injectable} from "@angular/core";
import {AccountService} from "../account/account.service";
import {AccountModel} from "../account/account.model";

@Injectable({providedIn: "root"})
export class VerificationService{

  constructor(private accountService: AccountService) {
  }

}
