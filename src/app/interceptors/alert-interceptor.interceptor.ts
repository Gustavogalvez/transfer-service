import {
  HttpErrorResponse,
  HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        switch (err.status) {
          default:
            this.errorDefault(err);
            break;
        }

        return throwError( err );

      })
    );
  }

  errorDefault(err: HttpErrorResponse) {
    console.warn(err);
    let msg = err.error.msg;
    this._snackBar.open('Error en: ' + msg, 'close', {
      duration: 3000,
    });
  }
}
