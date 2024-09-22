import { Injectable } from '@angular/core';

export interface ITableCol {
  key: string;
  text: string;
  editable?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl: string = 'http://localhost:9000/foodlab';

  billTableCols: ITableCol[] = [
    { key: 'id', text: 'id', editable: false },
    { key: 'orderID', text: 'Rendelés Id', editable: false },
    { key: 'amount', text: 'Összeg', editable: true },
    { key: 'status', text: 'Státusz', editable: true },
  ];

  customerTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'firstName', text: 'Keresztnév', editable: true },
    { key: 'lastName', text: 'Vezetéknév', editable: true },
    { key: 'email', text: 'Email', editable: true },
    { key: 'address', text: 'Cím', editable: true },
    { key: 'active', text: 'Aktív', editable: true },
  ];

  orderTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'customerID', text: 'Vásárló Id', editable: false },
    { key: 'productID', text: 'Termék Id', editable: false },
    { key: 'amount', text: 'Mennyiség', editable: true },
    { key: 'status', text: 'Státusz', editable: true },
  ];

  productTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'name', text: 'Termék név', editable: true },
    { key: 'type', text: 'Típus', editable: true },
    { key: 'catId', text: 'CatId', editable: false },
    { key: 'description', text: 'Leírás', editable: true },
    { key: 'price', text: 'Ár', editable: true },
    { key: 'featured', text: 'Kiemelt', editable: true },
    { key: 'active', text: 'Aktív', editable: true },
  ];

  constructor() {}
}
