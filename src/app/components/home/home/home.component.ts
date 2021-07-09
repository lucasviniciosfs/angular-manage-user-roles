import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  user: User;
  //userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { 
    this.user = this.authenticationService.userSubjectValue;  
  }

  ngOnInit(): void {  
    this.loading = true;
    this.userService.getById(this.user.id)
                      .pipe(first())
                      .subscribe(user => {
                        this.loading = false;
                        this.user = user;
                      });
  }

}
