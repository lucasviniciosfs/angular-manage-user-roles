import { AuthenticationService } from './services/authentication.service';
import { User } from 'src/app/shared/models/user';
import { Component } from '@angular/core';
import { Role } from './shared/models/Role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user!: User;
  
  constructor(
    private authenticationService: AuthenticationService
  ){
    this.authenticationService.user.subscribe(user => this.user = user!)
  }

  public get isAdmin() : boolean {
    return this.user && this.user.role === Role.Admin;
  }

  logout(){
    this.authenticationService.logout();
  }
  
}
