import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { User } from 'firebase';
import { CanActivate, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { UserService } from '../../core/user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User;

  constructor(private login: AngularFireAuth, private router: Router, private serviceUser: UserService) {
    this.login.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.serviceUser.saveUser(user);
      } else {
        localStorage.setItem('user', null);
      }
      error => {
        console.log(error)
      }
    })
  }

  loginWithGoogle() {
    return this.login.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logoutWithGoogle() {
    return this.login.auth.signOut();
  }

  async loginWithEmailPassword(email: string, password: string) {
    const result = await this.login.auth.signInWithEmailAndPassword(email, password)
    // this.router.navigate(['admin/list']);
  }

  async register(email: string, password: string) {
    const result = await this.login.auth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.login.auth.currentUser.sendEmailVerification()
    // this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.login.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logoutEmailPassword() {
    await this.login.auth.signOut();
    localStorage.removeItem('user');
    // this.router.navigate(['admin/login']);
  }

  get isLoggedIn(): boolean {
    if (this.user) {
      return true;
    }
  }

  getCurrentUser() {
    return this.login.authState;
  }

  getCurrentUserDb() {
    return this.login.authState
      .pipe(
        switchMap(user => {
          try {
            return this.serviceUser.getUserByuid(user.uid)
          }
          catch (error) {
            console.log(error);

          }
        }),
        map(user => {
          return user;
        })
      )
  }

}
