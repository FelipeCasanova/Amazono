import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {
  product = {
    title: '',
    description: '',
    price: 0,
    categoryId: '',
    product_picture: null
  };
  categories: any;
  btnDisabled = false;

  constructor(public data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3030/api/categories');
      data['success']
      ? this.categories = data['categories']
      : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  validate (product: any) {
    if (product.title) {
      if (product.description) {
        if (product.price) {
          if (product.categoryId) {
            if (product.product_picture) {
              return true;
            } else {
              this.data.error('Picture is not entered.');
            }
          } else {
            this.data.error('Category is not entered.');
          }
        } else {
          this.data.error('Price is not entered.');
        }
      } else {
        this.data.error('Description is not entered.');
      }
    } else {
      this.data.error('Title is not entered.');
    }
  }

  fileChange(event: any) {
    this.product.product_picture = event.target.files[0];
  }

  async post() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (key === 'product_picture') {
            form.append('product_picture', this.product.product_picture, this.product.product_picture.name);
          } else {
            form.append(key, this.product[key]);
          }
        }
        const data = await this.rest.post('http://localhost:3030/api/seller/products', form);
        data['success']
          ? this.data.success(data['message'])
          : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}