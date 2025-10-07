// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../modules/auth/service/auth.service';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    // 1. Clonar la solicitud y añadir el token (Bearer)
    // if (token) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }

    // 2. Manejar la respuesta
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el servidor responde con 401, el token expiró o es inválido.
          if (error.status === 401) {
        //   // 2.1. Cierre de sesión automático
         this.authService.logout();
         }
        
        // 2.2. Propagar el error
        return throwError(() => error); 
      })
    );
  }
}