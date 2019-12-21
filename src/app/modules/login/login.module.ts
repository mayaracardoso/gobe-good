import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth'

import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AngularFireAuthModule,
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule { }
