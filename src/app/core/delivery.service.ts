import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Delivery } from './../shared/models/delivery.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment'
import { EstadoBr } from '../order/models/estadosBR.model';

@Injectable()
export class DeliveryService {
  private url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?';
  private readonly headerAPI = {
    headers: {
      'responseType': 'text/xml',
      'Content-Type': 'text/xml',
      'Accept': 'text/xml',
    },
  };

  constructor(private http: HttpClient) { }

  getFrete(delivery: Delivery): Observable<any> {
    // const parser = new xml2js.Parser({'async': true, 'attrkey': '@', 'explicitArray': false});
    // parser.parseString((delivery, xml) => {
    //   console.log(xml.Servicos.cServico);
    //   return xml.Servicos.cServico;
    // })
    return this.http.post(environment.BASE_URL + this.url, delivery, { headers: new HttpHeaders({ 'Accept': 'text/xml', 'Content-Type': 'text/xml' }), responseType: 'text' as 'text' }).pipe(
      map((res: any) => {
        console.log('res', res);
        return res;
      })
    );
  }

  consultCep(cep: string): Observable<any> {
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }
    return of({});
  }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/data/estadosbr.json');
  }

}