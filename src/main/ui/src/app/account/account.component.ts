import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "./account.service";
import {AccountModel} from "./account.model";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  account: AccountModel = new AccountModel();
  accountSub: Subscription;

  constructor(private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log("init test: " + this.accountService.getAccount());
    if (this.accountService.getAccount()) {
      this.account = this.accountService.getAccount();
    }
    this.accountSub = this.accountService.accountChanged.subscribe(acc => {
      console.log("ngoninit: " + acc.firstName);
      if (acc) {
        this.account = acc;
      }
    });

  }

  onSubmit(form: any) {
    this.accountService.setAccount(this.account);
    let accountSaveSub: Observable<any>;
    accountSaveSub = this.accountService.saveAccount();

    accountSaveSub.subscribe({
      next: resData => {
        console.log(resData);
        this.account.accountId = resData.accountId;
        this.router.navigateByUrl('asset', {state: {userdata: this.account}});
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }
  }

  onTaxIdChange(taxId: string) {
    console.log("taxId: " + taxId);
    this.account.taxId = taxId;
  }

  onTaxTypeChange(taxType: string) {
    console.log("taxType: " + taxType);
    this.account.taxType = taxType;
  }
}
