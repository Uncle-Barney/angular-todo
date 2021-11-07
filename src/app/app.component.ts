import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(){}

  loginToggle: boolean = true;
  
  getValueToggle(loginToggle: boolean){
    this.loginToggle = loginToggle;
  };


}
