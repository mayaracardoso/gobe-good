import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


const routes: Routes = [
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
