import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private login:LoginService) { }

  ngOnInit() {
  }

  onLoginGoogle() {
     this.login.loginWithGoogle();
  }

}
