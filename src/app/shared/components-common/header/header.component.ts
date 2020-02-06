import { Router } from '@angular/router';
import { ShoppingCartService } from './../../../core/shopping-cart.service';
import { ProductService } from './../../../core/product.service';
import { LoginService } from '../../../user/login/login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch, faShoppingCart, faUser, faPhoneAlt, faTruck, faMoneyBillAlt, faTag, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private login: LoginService, private productService: ProductService, 
    private shoppingCart: ShoppingCartService, private router: Router) { }

  @Output() searchResultOutput = new EventEmitter<boolean>();
  
  searchProduct: string;
  user: any;
  itemQuantity = 0;


  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faPhoneAlt = faPhoneAlt;
  faShoppingBag = faShoppingBag;
  faMoneyBillAlt = faMoneyBillAlt;
  faTag = faTag;

  ngOnInit() {
    this.showCurrentUser();
    this.getItemsCart();
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
      }, error => console.error)
  }

  getProducts(name: string) {
    this.productService.searchProducts(name);
  }

  getItemsCart() {
    this.shoppingCart.getListItemsShoppingCartMapProducts()
      .subscribe(res => {
        this.itemQuantity = res.length;
      })
  }

  logout() {
    this.login.logoutWithGoogle();
  }

  onLogin() {
    this.router.navigate(['/user/login'])
  }

}
