import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public data: DataService) { }

  async ngOnInit() {
    try {
      if (!this.data.user) {
        await this.data.getProfile();
      }
    } catch (error) {
      this.data.error(error);
    }
  }

}
