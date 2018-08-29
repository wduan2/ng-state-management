import { Product } from '../data/product';
import { Observable } from 'rxjs';
import { AddProductDetails, LoadProductList, RemoveProductDetails } from './../product.actions';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Store, Select } from '@ngxs/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  productList$: Observable<Product[]>;

  constructor(private store: Store, private dataService: DataService) {
  }

  ngOnInit() {
    this.productList$ = this.store.select((state) => state.productList);
  }

  fetchProductList() {
    this.dataService.getProducts().subscribe((products) => {
      this.store.dispatch(new LoadProductList(products));
    });
  }

  onProductSelected() {

  }

  isProductSelected() {

  }
}
