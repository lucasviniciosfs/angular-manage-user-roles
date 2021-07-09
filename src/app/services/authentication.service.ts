import { environment } from './../../environments/environment';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user')!)
    )
  }

  public get userSubjectValue() : User | null {
    return this.userSubject.value
  }

  login(username: string, password: string) {
    return this.http.post<any>(
      `${environment.api}/users/authenticate`,
      {username: username, password: password}  
    ).pipe(
      map(user => {
        localStorage.setItem('user',JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  
}
