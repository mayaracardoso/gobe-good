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

  ngOnInit() {
  }

  registerEmailPassword(email: string, password: string) {
    this.confirmPassword === password ? this.loginService.register(email, password) : alert("A confirmação de senha está incorreta");
  }
}
