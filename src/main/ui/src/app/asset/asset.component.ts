import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountModel} from "../account/account.model";
import {AccountService} from "../account/account.service";
import {Observable, Subscription} from "rxjs";
import {AssetService} from "./asset.service";

export interface AssetData {
  id: string,
  name: string
}

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  assetForm: FormGroup;
  assetData: AssetData[] = [
    {id: 'BROKERAGE', name: 'Brokerage'},
    {id: 'STOCKS', name: 'Stocks'},
    {id: 'BONDS', name: 'Bonds'},
    {id: 'REAL', name: 'Real Estate'},
    {id: 'LIMITED', name: 'Master Limited Partnerships'}
  ];
  account: AccountModel;
  private assets: [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private assetService: AssetService) {
    // console.log(this.router.getCurrentNavigation().extras.state['userdata']);
  }


  ngOnInit(): void {
    this.assetForm = this.fb.group({
      selectedAssets: this.fb.array([])
    });
  }

  onChange(id: string, isChecked: boolean) {
    const assets = (this.assetForm.controls['selectedAssets'] as FormArray);

    if (isChecked) {
      assets.push(new FormControl(id));
    } else {
      const index = assets.controls.findIndex(x => x.value == id);
      assets.removeAt(index);
    }

    console.log(assets);

  }

  onSubmit() {
    this.assets = this.assetForm.value.selectedAssets;
    console.log(this.assetForm.value.selectedAssets);
    let assetSub: Observable<String>;
    assetSub = this.assetService.saveAssets(this.assets);

    assetSub.subscribe({
      next: resData => {
        console.log(resData);
        this.router.navigateByUrl('document');
      },
      error: err => {
        console.log(err);
      }
    });

  }
}
