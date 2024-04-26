import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerDataService } from '../../services/customer-data.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  closeResult!: string;
  constructor(private modalService: NgbModal, private customerDataService: CustomerDataService) { }
  customerForm!: FormGroup;
  ngOnInit() {
    this.customerForm = new FormGroup({
      orderNumber :  new FormControl(null),
      customerName : new FormControl(null),
      customerAddress: new FormControl(null),
      customerMobileNumber : new FormControl(null),
      orderTotal : new FormControl(null),
      orderDueDate : new FormControl(null)
    });
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.customerForm.reset();
      this.modalService.dismissAll();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.customerForm.reset();
      this.modalService.dismissAll();
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
  onSubmit() {
    this.customerDataService.addCustomer(this.customerForm);
    this.customerForm.reset();
    this.modalService.dismissAll();
  }
}
