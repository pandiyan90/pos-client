import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Bill } from '../../model/bill';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss'],
})
export class EditBillComponent implements OnInit {
  bill: Bill = new Bill();
  billId = 0;
  updating = false;

  constructor(
    private billService: BillService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => (this.billId = params?.['id']),
    );
    this.billService.get(this.billId).subscribe((bill) => (this.bill = bill));
  }

  setBillToDatabase(bill: Bill): void {
    this.updating = true;
    if (bill.id === 0) {
      this.billService.create(bill).subscribe(() => {
        this.updating = false;
        this.router.navigate(['bills']);
      });
    } else {
      this.billService.update(bill.id, bill).subscribe(() => {
        this.updating = false;
        this.router.navigate(['bills']);
      });
    }
  }
}
