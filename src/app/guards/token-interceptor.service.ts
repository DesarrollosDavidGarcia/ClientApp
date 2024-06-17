import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { AutenticacionService } from './autenticacion.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.credencial?.token ?? "";
    // const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Controll-Allow-Origin':'*' });
    const clonedreq = request.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      headers: header,

    });
    return next.handle(clonedreq).pipe(
      tap(
        (succ) => {
          if (token == null && token == "") {
            this.router.navigateByUrl('/autenticacion/login');
          }
        },
        (err) => {
          
          if (err.status === 401) {
            this.router.navigateByUrl('/autenticacion/login');
          } else if (err.status === 403) {
            // this.router.navigateByUrl('/autenticacion/404');
          } else if (err.status === 400) {
            // this.router.navigateByUrl('/autenticacion/404');
          
          }
        }
      )
    );
  }
}
