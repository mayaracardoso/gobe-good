import { LoginService } from './login/login.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  user = new User();
  confirmPassword: string;
  showMessage = false;

  ngOnInit() {
  }

  registerEmailPassword(email: string, password: string) {
    if(!this.validatePasswordConfirmation()) {
      this.showMessage = true;
    } else {
      this.loginService.register(email, password);
    }
  }

  validatePasswordConfirmation(): boolean {
    if(this.confirmPassword === this.user.password) {
      return true;
    }
  }

  disabledButton(): boolean {
    if(!this.user.name || !this.user.email || !this.user.password || !this.confirmPassword) {
      return true;
    }
    return false;
  }
  


}
