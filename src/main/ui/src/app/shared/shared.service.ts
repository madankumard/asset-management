import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({providedIn: "root"})
export class SharedService{

  public handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error) {
      return throwError(() => (errorMessage));
    } else if (errorResponse.error.message) {
      errorMessage = errorResponse.error.message;
    } else if (errorResponse.error.error) {
      errorMessage = errorResponse.error.error;
    }
    return throwError(() => (errorMessage));
  }
}
