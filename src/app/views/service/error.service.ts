import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class ErrorHandling{
public handleError(error: HttpErrorResponse) {
    console.error("ErrorEvent ["+ErrorEvent+"]")
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      error);
  };
}