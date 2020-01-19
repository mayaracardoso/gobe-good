import { configFirebase } from './../environments/environment.firebase';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginModule } from './login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components-common/header/header.component';
import { FooterComponent } from './shared/components-common/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';
firebase.initializeApp(configFirebase); 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    LayoutModule,
    LoginModule,
    FormsModule,
    AngularFireModule.initializeApp(configFirebase, 'goobe-good'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ShoppingCartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
