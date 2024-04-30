import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Customer} from './customer';
import { Config } from 'datatables.net';

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
  dtOptions: Config = {};
  customers: Customer[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
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
            recordsTotal: 14,
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
