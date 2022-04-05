import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DocumentService} from "./document.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documentForm: FormGroup;
  selectedFiles: File;
  previewUrl: string;

  documentType = [
    {'id': 'W01','name': 'W01'},
    {'id': 'W02','name': 'W02'},
    {'id': 'W03','name': 'W03'}
  ];

  constructor(private documentService: DocumentService,
              private router: Router,) { }

  ngOnInit(): void {
    this.documentForm = new FormGroup({
      'selectedDocument': new FormControl(null),
      'selectedFile': new FormControl('')
    });

    this.documentForm.get('selectedDocument').valueChanges
      .subscribe(value => {
        this.onDocumentChange(value);
      });
  }

  onSubmit() {
    console.log('onSubmit');
    let docSub: Observable<String>;
    docSub = this.documentService.saveDocument(this.documentForm.controls['selectedDocument'].value,
      this.selectedFiles);

    docSub.subscribe({
      next: resData => {
        console.log(resData);
        this.router.navigateByUrl('verify');
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private onDocumentChange(value: string) {
    console.log('onDocumentChange:' + value);
  }

  onFileChange(event: any){
    this.selectedFiles = event.target.files[0];
    this.previewUrl = URL.createObjectURL(event.target.files[0]);
    console.log("URL: "+ this.previewUrl);
  }

}
