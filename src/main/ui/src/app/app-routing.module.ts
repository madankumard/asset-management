import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AccountComponent} from "./account/account.component";
import {DocumentComponent} from "./document/document.component";
import {VerificationComponent} from "./verification/verification.component";
import {TaxComponent} from "./account/tax/tax.component";
import {AssetComponent} from "./asset/asset.component";
import {AccountResolverService} from "./account/account-resolver.service";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'account', component: AccountComponent},
  {path: 'asset', component: AssetComponent},
  {path: 'tax', component: TaxComponent},
  {path: 'document', component: DocumentComponent},
  {path: 'verify', component: VerificationComponent, resolve: [AccountResolverService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
