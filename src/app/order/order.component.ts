import { EstadoBr } from './models/estadosBR.model';
import { Router } from '@angular/router';
import { User } from './../user/user.model';
import { LoginService } from './../user/login/login.service';
import { ShoppingCartService } from './../core/shopping-cart.service';
import { DeliveryService } from './../core/delivery.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  productsOrder: any[];
  user = new User();
  order = new Order();
  estados: EstadoBr[];

  constructor(private delivery: DeliveryService, private shoppingCart: ShoppingCartService,
    private loginService: LoginService, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.getItemsShoppingCart();
    this.getCurrentUser();
    this.getEstadosBR();
    this.order.customerInfo.user = this.user;
  }

  getItemsShoppingCart() {
    this.shoppingCart.getListItemsShoppingCartMapProducts().subscribe((res) => {
      this.productsOrder = res;
    });
  }

  getCurrentUser() {
    this.loginService.getCurrentUserDb()
      .subscribe((res) => {
        this.user = res;
      })
  }

  getAddressInfo(cep: string) {
    this.delivery.consultCep(cep).subscribe((res) => {
      console.log(res);
      this.order.customerInfo.address = res.logradouro;
      this.order.customerInfo.neighborhood = res.bairro;
      this.order.customerInfo.city = res.localidade;
      this.order.customerInfo.UF = res.uf;
    })
  }

  getEstadosBR() {
    this.delivery.getEstadosBr()
      .subscribe(dados => this.estados = dados);
  }


  sumTotal(): string {
    let sumItems = 0;
    this.productsOrder.forEach((item) => {
      sumItems += (+item.price * item.quantity);
    });
    return sumItems.toFixed(2);
  }

  async onPay() {
    let order = {
      dateCreated: new Date().getTime(),
      items: this.productsOrder,
      total: this.sumTotal(),
      customerInfo: this.order.customerInfo,
      paid: true,
    }
    let orderResult: any = await this.orderService.createOrder(order);
    console.log("Ordem de compra", orderResult);
    this.shoppingCart.clearShpoppingCart();
    this.router.navigate(['', orderResult.key]);
  }

  onCancel() {
    this.router.navigate(['']);
  }

  disabledButton() {
    if(!this.user.name || !this.order.customerInfo.cpf || !this.user.email || 
      !this.order.customerInfo.phone || !this.order.customerInfo.cep || !this.order.customerInfo.address || 
      !this.order.customerInfo.addressNumber || !this.order.customerInfo.neighborhood || !this.order.customerInfo.city || !this.order.customerInfo.UF) {
        return true;
      } else {
        return false;
      }
  }
}
