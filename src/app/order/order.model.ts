import { User } from '../user/user.model';

class CustomerInfo {
    user = new User();
    cpf: string;
    phone: string;
    cep: string;
    address: string;
    addressNumber: string;
    addressComplement: string;
    neighborhood: string;
    city: string;
    UF: string;
}

export class Order {
    id?: string;
    customerInfo = new CustomerInfo();
}
