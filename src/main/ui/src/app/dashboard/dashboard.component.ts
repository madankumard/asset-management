import { Component, OnInit } from '@angular/core';

export interface AccountData{
  position: string,
  oid: string,
  accountNumber: string,
  name: string,
  country: string
}

const ELEMENT_DATA: AccountData[] = [
  {'position':'1', 'oid':'1234', 'accountNumber':'23534534', 'name':'Will', 'country':'US'},
  {'position':'2', 'oid':'4564', 'accountNumber':'23534535', 'name':'Arthur', 'country':'UK'},
  {'position':'3', 'oid':'7893', 'accountNumber':'23534536', 'name':'Zin', 'country':'China'},
  {'position':'4', 'oid':'2343', 'accountNumber':'23534537', 'name':'Tim', 'country':'UK'},
  {'position':'5', 'oid':'3453', 'accountNumber':'23534538', 'name':'Tony', 'country':'US'},
  {'position':'6', 'oid':'3454', 'accountNumber':'23534539', 'name':'Kumar', 'country':'India'},
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'oid', 'accountNumber', 'name', 'country'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
