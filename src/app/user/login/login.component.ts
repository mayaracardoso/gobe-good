import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(private login: LoginService, private router: Router) { }

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

  goToRegisterUser() {
    this.router.navigate(['/user/register']);
  }

}
