import { Component, OnInit } from '@angular/core';
import { ID, noop } from '@datorama/akita';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from '../data/data.service';
import { Product } from '../data/product';
import { ProductDetails } from '../data/product-details';
import { ProductQuery } from '../product-query';
import { ProductStore } from '../product-store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  productList$: Observable<Product[]>;
  proudctListLoading$: Observable<boolean>;
  
  productDetails$: Observable<ProductDetails[]>;
  productDetailsLoading$: Observable<boolean>;

  selectedProductId: ID;

  constructor(private dataService: DataService, private productStore: ProductStore, private productQuery: ProductQuery) {
  }

  ngOnInit() {
    
  }

  // ------------------ Akita ------------------

  fetchProductList() {
    this.fetchProductListLoader().subscribe();
    this.productDetailsLoading$ = this.productQuery.selectLoading();
    this.productList$ = this.productQuery.selectAll();
  }

  private fetchProductListLoader(): Observable<Product[]> {
    const request = this.dataService.getProducts().pipe(
      tap(products => { 
        // replace old state list by new state list
        // TODO: how main different product groups
        this.productStore.set(products);

        console.log(this.productQuery.getSnapshot());
      })
    )

    return this.productQuery.isPristine ? request : noop();
  } 

  // ------------------ Akita ------------------

  isProductSelected(productId: ID) {
    return this.selectedProductId === productId;
  }

  fetchProductDetails(productId: ID) {

  }
}
