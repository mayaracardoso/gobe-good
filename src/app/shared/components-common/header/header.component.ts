import { LoginService } from './../../../login/login.service';
import { Component, OnInit } from '@angular/core';
import { faSearch, faShoppingBag, faUser, faPhoneAlt, faTruck, faMoneyBillAlt, faTag, faHeart } from '@fortawesome/free-solid-svg-icons';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private login: LoginService) { }

  user: any;

  faSearch = faSearch;
  faShoppingBag = faShoppingBag;
  faUser = faUser;
  faPhoneAlt = faPhoneAlt;
  faTruck = faTruck;
  faMoneyBillAlt = faMoneyBillAlt;
  faTag = faTag;
  faHeart = faHeart;

  ngOnInit() {
    this.showCurrentUser();
  }

  showCurrentUser() {
    this.login.getCurrentUser()
      .pipe(
        switchMap(user => {
          console.log(user);
          if (!user) return 'e';
          return this.login.getCurrentUserDb();
        }),
        map(user => user)
      )
      .subscribe(user => {
        if (user != 'e') this.user = user
        else
          this.user = null;
      }, erreur => console.log)
  }

  logout() {
    this.login.logoutWithGoogle();
  }
}
