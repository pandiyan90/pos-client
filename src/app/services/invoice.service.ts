import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/apiresponse';
import { Invoice } from '../model/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService<Invoice> {
  url: string = '';

  constructor(
    override config: ConfigService,
    override http: HttpClient
  ) {
    super(config, http, 'transferOuts');
    this.url = this.getApiUrl();
  }

  saveInvoice(invoice: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.url+'/create', invoice);
  }

}
