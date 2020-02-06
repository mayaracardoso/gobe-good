import { SuccessOrderComponent } from './order/success-order/success-order.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { OrderComponent } from './order/order.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './core/guards/auth.guard.service';


const routes: Routes = [
  {
    path: '', component: LayoutComponent
  },
  {
    path: 'product-detail', component: ProductDetailComponent,
  },
  {
    path: 'products', component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order', component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/login', component: LoginComponent,
  },
  {
    path: 'user/register', component: UserComponent,
  },
  {
    path: 'success-order', component: SuccessOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
