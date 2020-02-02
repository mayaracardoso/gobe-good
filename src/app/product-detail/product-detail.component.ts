import { Delivery } from './../shared/models/delivery.model';
import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../core/shopping-cart.service';
import { DeliveryService } from './../core/delivery.service';
import { ProductService } from './../core/product.service';
import { Product } from './../shared/models/product.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product = new Product();
  isVisibleTable = false;
  cep: string;
  sizes = new Array<string>();

  constructor(private productService: ProductService,
    private shoppingCart: ShoppingCartService,
    private delivery: DeliveryService) {
  }

  ngOnInit() {
    this.sizes = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
    let product = new Product();
    product.id = '1';
    this.getInfoProduct(product);
  }

  getInfoProduct(product: Product) {
    this.productService.getProductbyId(product.id)
      .subscribe(product => {
        this.product = product;
      });
  }

  showMeasureTable() {
    this.isVisibleTable = !this.isVisibleTable;
  }

  selectSize(size: string) {
    this.product.size = size;
    console.log(this.product);
  }

  addProductShoppingCart() {
    this.shoppingCart.addToCart(this.product);
  }

  calculeShippin(cep: string) {
    let delivery = new Delivery();
    delivery.sCepDestino = cep;
    this.delivery.getFrete(delivery).subscribe((res) => {
      console.log('Res', res);
    });
  }

  soapCall() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/api/http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?', true);
    let sr =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
      <soapenv:Header/>
      <soapenv:Body>
         <tem:CalcPrecoPrazo>
            <tem:nCdEmpresa></tem:nCdEmpresa>
            <tem:sDsSenha></tem:sDsSenha>
            <tem:nCdServico>04510</tem:nCdServico>
            <tem:sCepOrigem>03757040</tem:sCepOrigem>
            <tem:sCepDestino>04303001</tem:sCepDestino>
            <tem:nVlPeso>1</tem:nVlPeso>
            <tem:nCdFormato>1</tem:nCdFormato>
            <tem:nVlComprimento>20</tem:nVlComprimento>
            <tem:nVlAltura>6</tem:nVlAltura>
            <tem:nVlLargura>20</tem:nVlLargura>
            <tem:nVlDiametro>0</tem:nVlDiametro>
            <tem:sCdMaoPropria>N</tem:sCdMaoPropria>
            <tem:nVlValorDeclarado>0</tem:nVlValorDeclarado>
            <tem:sCdAvisoRecebimento>N</tem:sCdAvisoRecebimento>
         </tem:CalcPrecoPrazo>
      </soapenv:Body>
   </soapenv:Envelope>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const xml = xmlhttp.responseXML;
          // const response_number = parseInt(xml.getElementsByTagName("return")[0].childNodes[0].nodeValue); //Here I'm getting the value contained by the <return> node
          console.log(xml); //I'm printing my result square number
        }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

}
