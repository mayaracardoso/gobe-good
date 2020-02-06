import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from 'src/app/user/login/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private login: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.login.authState
      .pipe(
        map(user => {
          if (user) return true
          else {
            this.router.navigate(['/user/login']);
            return false;
          }
        })
      )
  }
}
