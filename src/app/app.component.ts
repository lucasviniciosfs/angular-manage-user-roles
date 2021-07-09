import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;
  
  public get isAdmin() : boolean {
    return true; 
  }

  logout(){}
  
}
