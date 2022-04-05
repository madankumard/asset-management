import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.userSub = this.loginService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
