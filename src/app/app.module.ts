import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as firebase from 'firebase';
import { configFirebase } from './../environments/environment.firebase';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { OrderComponent } from './order/order.component';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ProductsModule } from './products/products.module';
import { FooterComponent } from './shared/components-common/footer/footer.component';
import { HeaderComponent } from './shared/components-common/header/header.component';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { UserModule } from './user/user.module';

firebase.initializeApp(configFirebase); 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    LayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(configFirebase, 'goobe-good'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ShoppingCartModule,
    UserModule,
    ProductDetailModule,
    ProductsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
