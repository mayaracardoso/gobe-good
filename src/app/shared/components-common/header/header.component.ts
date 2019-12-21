import { Component, OnInit } from '@angular/core';
import { faSearch, faShoppingBag, faUser, faPhoneAlt, faTruck, faMoneyBillAlt, faTag, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSearch = faSearch;
  faShoppingBag = faShoppingBag;
  faUser = faUser;
  faPhoneAlt = faPhoneAlt;
  faTruck = faTruck;
  faMoneyBillAlt = faMoneyBillAlt;
  faTag = faTag;
  faHeart = faHeart;

  ngOnInit() {
  }

}
