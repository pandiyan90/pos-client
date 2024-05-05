import { Component } from '@angular/core';
import { MasterService } from '../../../services/master.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent {
  constructor(public service:MasterService){

  }
  functionremove(slno:any){
    this.service.RemoveProduct(slno);
  }

  functionedit(slno:any){
    this.service.GetProductbyCode(slno);
  }
}
