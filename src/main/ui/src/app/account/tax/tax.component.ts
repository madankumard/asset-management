import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  @Input() selectedOption: string;
  @Input() taxId: string;
  taxType = [];
  @Output() taxTypeChange = new EventEmitter<string>();
  @Output() taxIdChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.taxType = [
      {name: 'Individual Taxpayer Identification Number', value: 'ITIN'},
      {name: 'Social Security Number', value: 'SSN'},
      {name: 'Employer Identification Number', value: 'EIN'}
    ];
  }

  onSubmit(f: any) {
  }

  onTaxTypeChange() {
    this.taxTypeChange.emit(this.selectedOption);
  }

  onTaxIdChange() {
    this.taxIdChange.emit(this.taxId);
  }
}
