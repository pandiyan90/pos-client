import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import { Config } from 'datatables.net';
import { ADTSettings } from 'angular-datatables/src/models/settings';

class DataTablesResponse {
  data: any[] = [];
  draw!: number;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  dtOptions: any = {};
  customers: Customer[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      search: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        that.customers = [{
            "customerNumber": 11,
            "customerName": "customerName",
            "contactLastName": "string",
            "contactFirstName": "string",
            "phone": "string",
            "city": "string",
            "state": "string",
            "country": "string",
            "creditLimit": 123
        },
        {
          "customerNumber": 112,
          "customerName": "alex",
          "contactLastName": "string",
          "contactFirstName": "string",
          "phone": "string",
          "city": "string",
          "state": "string",
          "country": "string",
          "creditLimit": 1234
      }];
      callback({
            recordsTotal: that.customers.length,
            recordsFiltered: 10,
            data: [],
      });
      },
      columns: [
        {data: 'customer_number'},
        {data: 'customer_name'},
        {data: 'contact_first_name'},
        {data: 'contact_last_name'},
        {data: 'phone'},
        {data: 'city'},
        {data: 'state'},
        {data: 'country'},
        {data: 'credit_limit'}
      ]
    };
  }

}
