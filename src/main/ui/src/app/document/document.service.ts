import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AccountService} from "../account/account.service";
import {SharedService} from "../shared/shared.service";
import {catchError} from "rxjs/operators";
import {tap} from "rxjs";

@Injectable({providedIn: "root"})
export class DocumentService {

  accountId: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private accountService: AccountService,
              private sharedService: SharedService) {

    if (this.accountService.getAccount()) {
      this.accountId = this.accountService.getAccount().accountId;
    }
  }

  saveDocument(docType: string, doc: File) {
    console.log("file in 123 docservice: " + doc.size);
    let formData = new FormData();
    formData.append('file', doc);
    return this.httpClient.post("http://localhost:8080/api/document/fileupload",
      formData, {
        headers: {"Content-Type": "multipart/form-data"},
        params: {
          documentType: docType,
          accountId: this.accountId
        },
        responseType: 'text'
      }).pipe(catchError(this.sharedService.handleError), tap(resData => {
        console.log(resData)
      })
    );
  }
}
