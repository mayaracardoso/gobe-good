import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class UserModule { }
