import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { CanActivate, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { UserService } from '../../core/user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {


  constructor(private login: AngularFireAuth, private router: Router, private serviceUser: UserService) {

    this.login.authState
      .subscribe(user => {
        this.serviceUser.saveUser(user);
      },
        error => {
          console.log(error)
        }
      );
  }

  loginWithGoogle() {
    return this.login.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logoutWithGoogle() {
    return this.login.auth.signOut();
  }

  getCurrentUser() {
    return this.login.authState;
  }

  canActivate(): Observable<boolean> {
    return this.login.authState
      .pipe(
        map(user => {
          if (user) return true
          else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      )
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
