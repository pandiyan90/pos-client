import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Bill } from '../../model/bill';
import { BillService } from '../../services/bill.service';
import { ConfigService, ITableCol } from '../../services//config.service';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-listing-bill',
  templateUrl: './listing-bill.component.html',
  styleUrls: ['./listing-bill.component.scss'],
})
export class ListingBillComponent implements OnInit {
  numberOfAllBills$: BehaviorSubject<number> =
    this.statisticsService.numberOfAllBills$;

  @Input() id = 0;

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  cols: ITableCol[] = this.configService.billTableCols;
  phrase = '';
  filterKey = 'amount';
  filterKeys: string[] = Object.keys(new Bill());
  sorterKey = '';
  sorterDirection = 1;
  selectedBillToDelete: Bill = new Bill();

  constructor(
    private billService: BillService,
    private router: Router,
    private configService: ConfigService,
    private statisticsService: StatisticsService,
  ) {}

  ngOnInit(): void {
    this.billService.getAll();
    this.statisticsService.subscribeForData();
  }

  setToDelete(bill: Bill): void {
    this.selectedBillToDelete = bill;
  }

  onRemove(): void {
    this.billService.remove(this.selectedBillToDelete.id).subscribe(() => {
      this.billService.getAll();
      this.router.navigate(['/bills']);
    });
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onSort(key: string): void {
    if (key === this.sorterKey) {
      this.sorterDirection *= -1;
    } else {
      this.sorterDirection = 1;
    }

    this.sorterKey = key;
  }
}
