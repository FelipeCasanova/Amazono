import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message = '';
  messageType = 'danger';
  user: any;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message: any) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message: any) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message: any) {
    this.messageType = 'warning';
    this.message = message;
  }

  getProfile() {
  }
}
