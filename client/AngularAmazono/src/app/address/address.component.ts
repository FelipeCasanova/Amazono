import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  btnDisabled = false;
  currentAddress: any;

  constructor(public data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      const res = await this.rest.get('http://localhost:3030/api/accounts/address');
      if (JSON.stringify(res['address']) === '{}' && this.data.message === '' ) {
        this.data.warning('You have not entered you shipping address. Please entered your shipping address.');
      }
      this.currentAddress = res['address'];
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async updateAddress() {
    this.btnDisabled = true;
    try {
      const res = await this.rest.post('http://localhost:3030/api/accounts/address',
        this.currentAddress
      );
      if (res['success']) {
        this.data.getProfile();
        this.data.success(res['message']);
      } else {
        this.data.error(res['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
