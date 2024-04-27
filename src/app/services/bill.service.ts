import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../model/bill';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseService<Bill> {

  constructor(
    override config: ConfigService,
    override http: HttpClient
  ) {
    super(config, http, 'bills');
  }
}
