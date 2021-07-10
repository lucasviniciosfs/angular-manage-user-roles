import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService:AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.authenticationService.userSubjectValue!;
    const isLoggedIn = user && user.token;
    //const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn) {//(isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${user.token}`
            }
        });
    }

    return next.handle(request);
  }
}
