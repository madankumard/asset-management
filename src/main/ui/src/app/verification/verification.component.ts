import { Component, OnInit } from '@angular/core';
import {AccountModel} from "../account/account.model";
import {VerificationService} from "./verification.service";
import {AccountService} from "../account/account.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  account: AccountModel;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.account = this.accountService.getAccount();
    console.log(this.account);
  }

}
