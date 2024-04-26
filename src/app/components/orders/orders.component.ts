import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CustomerDataService } from '../../services/customer-data.service';
import { Order } from './order.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
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
