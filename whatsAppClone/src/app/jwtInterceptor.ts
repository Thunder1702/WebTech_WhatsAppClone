import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth_service: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                'Authorization': `Bearer ${this.auth_service.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        return next.handle(request).pipe(catchError((error) => {
            if(error.status == 410){
                this.router.navigate(['signin']);
                sessionStorage.removeItem('token');
            }
            return throwError(error);
        }));
    }

}