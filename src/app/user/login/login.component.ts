import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(private login: LoginService) { }

  ngOnInit() {
  }

  onLoginGoogle() {
    this.login.loginWithGoogle();
  }

  onLoginEmailPassword(email: string, password: string) {
    this.login.loginWithEmailPassword(email, password);
  }

  resetPassword(email: string) {
    this.login.sendPasswordResetEmail(email);
  }

}
