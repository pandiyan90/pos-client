  import { Component, AfterViewInit, OnInit, OnDestroy, ElementRef, TemplateRef, ViewChild } from '@angular/core';
  import { DataTableDirective } from 'angular-datatables';
  import { Subject } from 'rxjs';
  import { CustomerDataService } from '../../services/customer-data.service';
  import { Order } from './order.model';
  import {NgbModal, ModalDismissReasons, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
  import { NgForm } from '@angular/forms';
  import { Config } from 'datatables.net';

  @Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
  })
  export class OrdersComponent implements OnInit {
    @ViewChild(DataTableDirective, {static: false})
    datatableElement?: DataTableDirective;

    dtOptions: Config = {};
    //dtTrigger: Subject<any> = new Subject<any>();

    closeResult!: string;
    constructor(private customerDataService: CustomerDataService,
                private modalService: NgbModal,
                private elementRef: ElementRef) { }
    orders: Order[] = [];
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
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        ajax: (dataTablesParameters: any, callback) => {
          this.orders = this.customerDataService.getCustomers();
          callback({
            recordsTotal: this.orders.length,
            recordsFiltered: 10,
            data: [],
          });
        },
        columns: [
          {data: 'Order No'},
          {data: 'Name'},
          {data: 'Address'},
          {data: 'Mobile'},
          {data: 'Order Total'},
          {data: 'Order DueDate'},
          {data: 'Action', orderable: false}
        ]
      };

      // Trigger the table rendering after options are set
      //this.dtTrigger.next(this.orders);
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
      this.orders[this.index] = form.value;
      this.modalService.dismissAll();
    }
  }
