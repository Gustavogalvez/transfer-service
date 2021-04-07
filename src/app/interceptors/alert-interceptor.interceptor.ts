import {
  HttpErrorResponse,
  HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interceptor para las alertas cuando una petición falla
 */
@Injectable({ providedIn: 'root' })
export class AlertInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        /** Por el momento solo se manda al default, extendible a otros status*/
        switch (err.status) {
          default:
            this.errorDefault(err);
            break;
        }

        return throwError( err );

      })
    );
  }

  /**
   * Procesa los errores por defecto
   * @param err `HttpErrorResponse`
   */
  errorDefault(err: HttpErrorResponse) {
    console.warn(err);
    let msg = err.error.msg;
    this._snackBar.open('Error en: ' + msg, 'cerrar', {
      duration: 5000,
    });
  }
}
