import { Component } from '@angular/core';
import { MasterService } from '../../../services/master.service';

@Component({
  selector: 'app-productsummary',
  templateUrl: './productsummary.component.html',
  styleUrls: ['./productsummary.component.scss']
})
export class ProductsummaryComponent {

  constructor(public service:MasterService){
    
  }
}
