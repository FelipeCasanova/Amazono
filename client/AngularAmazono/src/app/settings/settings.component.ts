import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  btnDisabled = false;
  currentSettings: any;

  constructor(public data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      if (!this.data.user) {
        await this.data.getProfile();
      }
      this.currentSettings = Object.assign({
        newPwd: '',
        pwdConfirm: ''
      }, this.data.user);
    } catch (error) {
      this.data.error(error);
    }
  }

  validate(settings: any) {
    if (settings['name']) {
      if (settings['email']) {
        if (settings['newPwd']) {
          if (settings['pwdConfirm']) {
            if (settings['newPwd'] === settings['pwdConfirm']) {
              return true;
            } else {
              this.data.error('Password does not match.');
            }
          } else {
            this.data.error('Confirmation password is not entered.');
          }
        } else {
          this.data.error('New Password is not entered.');
        }
      } else {
        this.data.error('Email is not entered.');
      }
    } else {
      this.data.error('Name is not entered.');
    }
  }

  async update() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentSettings)) {
        const data = await this.rest.post('http://localhost:3030/api/accounts/profile', {
          name: this.currentSettings['name'],
          email: this.currentSettings['email'],
          passwrod: this.currentSettings['newPwd'],
          isSeller: this.currentSettings['isSeller']
        });
        if (data['success']) {
          this.data.getProfile();
          this.data.success(data['message']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error);
    }
    this.btnDisabled = false;
  }
}
