import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bill } from '../model/bill';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { BillService } from './bill.service';
import { CustomerService } from './customer.service';
import { OrderService } from './order.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  //productList$: BehaviorSubject<Product[]> = this.productService.list$;

  numberOfAllBills$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfAllCustomers$: BehaviorSubject<number> = new BehaviorSubject<number>(
    -1,
  );
  numberOfAllOrders$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfAllProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(
    -1,
  );

  constructor(
    private billService: BillService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
  ) {}

  subscribeForData(): void {
    //For bills
    this.billService.getAll();
    this.numberOfAllBills$.next(-1);
    this.setNumberOfAllBills();
    //For customers
    this.customerService.getAll();
    this.numberOfAllCustomers$.next(-1);
    this.setNumberOfAllCustomers();
    //For orders
    this.orderService.getAll();
    this.numberOfAllOrders$.next(-1);
    this.setNumberOfAllOrders();
    //For products
    //this.productService.getAll();
    //this.numberOfAllProducts$.next(-1);
    //this.setNumberOfAllProducts();
  }

  setNumberOfAllBills(): void {
    this.billList$.subscribe((billList) =>
      this.numberOfAllBills$.next(billList.length),
    );
  }

  setNumberOfAllCustomers(): void {
    this.customerList$.subscribe((customerList) =>
      this.numberOfAllCustomers$.next(customerList.length),
    );
  }

  setNumberOfAllOrders(): void {
    this.orderList$.subscribe((orderList) =>
      this.numberOfAllOrders$.next(orderList.length),
    );
  }

  setNumberOfAllProducts(): void {
    //this.productList$.subscribe(
    //productList => this.numberOfAllProducts$
    //.next(productList.length));
  }
}
