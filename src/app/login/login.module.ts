import { UserService } from './../login/user.service';
import { LoginService } from './../login/login.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    LoginService,
    UserService,
  ]
})
export class LoginModule { }
