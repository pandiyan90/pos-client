import { Component, AfterViewInit, OnInit, OnDestroy, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { CustomerDataService } from '../../services/customer-data.service';
import { Order } from './order.model';
import {NgbModal, ModalDismissReasons, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  closeResult!: string;
  constructor(private customerDataService: CustomerDataService,
              private modalService: NgbModal,
              private elementRef: ElementRef) { }
  order: Order[] = this.customerDataService.order;
  orderNumber!: number;
  customerName!: string;
  customerAddress!: string;
  customerMobileNumber!: number;
  orderTotal!: number;
  orderDueDate!: Date;
  index!: number;

  open(content: any, i: number) {
    this.index = i;
    const data = this.customerDataService.getCustomerData(i);
    this.orderNumber = data.orderNumber;
    this.customerName = data.customerName;
    this.customerAddress = data.customerAddress;
    this.customerMobileNumber = data.customerMobileNumber;
    this.orderTotal = data.orderTotal;
    this.orderDueDate = data.orderDueDate;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers', // option for server-side pagination
      processing: true,
      columns: [
        { title: 'Order No', data: 'orderNumber'},
        { title: 'Customer Name', data: 'customerName'},
        { title: 'Customer Address', data: 'customerAddress'},
        { title: 'Mobile Number', data: 'customerMobileNumber'},
        { title: 'Order Total', data: 'orderTotal'},
        { title: 'Order DueDate', data: 'orderDueDate'}
      ]
    };

    // Trigger the table rendering after options are set
    this.dtTrigger.next(this.dtOptions);
    //this.dtOptions = this.customerDataService.getCustomers().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  onDelete(i: number) {
    if (!confirm('Are you sure you want to delete?')) { return; }
    this.customerDataService.deleteUserData(i);
  }

  updateData(form: NgForm) {
    this.order[this.index] = form.value;
    this.modalService.dismissAll();
  }
}
