import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerOrder } from '../model/CustomerOrder';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  order: CustomerOrder[] = [
    {
      orderNumber: 101,
      customerName: 'Vikas',
      customerAddress: 'Hyderabad',
      customerMobileNumber: 8341303459,
      orderTotal: 26,
      orderDueDate: new Date('Jan 11, 2020'),
    },
    {
      orderNumber: 101,
      customerName: 'Vikas',
      customerAddress: 'Hyderabad',
      customerMobileNumber: 8341303459,
      orderTotal: 26,
      orderDueDate: new Date('Jan 11, 2020'),
    },
    {
      orderNumber: 101,
      customerName: 'Vikas',
      customerAddress: 'Hyderabad',
      customerMobileNumber: 8341303459,
      orderTotal: 26,
      orderDueDate: new Date('Jan 11, 2020'),
    },
    {
      orderNumber: 101,
      customerName: 'Vikas',
      customerAddress: 'Hyderabad',
      customerMobileNumber: 8341303459,
      orderTotal: 26,
      orderDueDate: new Date('Jan 11, 2020'),
    },
    {
      orderNumber: 101,
      customerName: 'Vikas',
      customerAddress: 'Hyderabad',
      customerMobileNumber: 8341303459,
      orderTotal: 26,
      orderDueDate: new Date('Jan 11, 2020'),
    },
    {
      orderNumber: 101,
      customerName: 'Vikas',
      customerAddress: 'Hyderabad',
      customerMobileNumber: 8341303459,
      orderTotal: 26,
      orderDueDate: new Date('Jan 11, 2020'),
    },
    {
      orderNumber: 101,
      customerName: 'Vikas',
      customerAddress: 'Hyderabad',
      customerMobileNumber: 8341303459,
      orderTotal: 26,
      orderDueDate: new Date('Jan 11, 2020'),
    },
    {
      orderNumber: 101,
      customerName: 'Vikas',
      customerAddress: 'Hyderabad',
      customerMobileNumber: 8341303459,
      orderTotal: 26,
      orderDueDate: new Date('Jan 11, 2020'),
    },
    {
      orderNumber: 102,
      customerName: 'Pranay',
      customerAddress: 'LB Nagar',
      customerMobileNumber: 9866093888,
      orderTotal: 89,
      orderDueDate: new Date('June 06, 1995'),
    },
    {
      orderNumber: 105,
      customerName: 'Pranay',
      customerAddress: 'LB Nagar',
      customerMobileNumber: 9866093888,
      orderTotal: 89,
      orderDueDate: new Date('June 06, 1995'),
    },
    {
      orderNumber: 103,
      customerName: 'Mahesh',
      customerAddress: 'Gachibowli',
      customerMobileNumber: 9812345464,
      orderTotal: 19,
      orderDueDate: new Date('July 21, 2003'),
    },
  ];

  constructor() {}

  addCustomer(form: any) {
    this.order.push(form.value);
  }
  deleteUserData(i: number) {
    this.order.splice(i, 1);
  }
  getCustomerData(i: number) {
    return this.order[i];
  }
  getCustomers() {
    return this.order;
  }
  updateCustomerData(form: any, i: number) {
    this.order.splice(i, form.value);
  }
}
