import { Component, OnInit } from '@angular/core';
import { ID, noop } from '@datorama/akita';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from '../data/data.service';
import { Product } from '../data/product';
import { ProductDetails } from '../data/product-details';
import { ProductDetailsQuery } from '../product-details-query';
import { ProductDetailsStore } from '../product-details-store';
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

  selectedProductId: ID;

  constructor(private dataService: DataService,
    private productStore: ProductStore,
    private productQuery: ProductQuery,
    private productDetailsStore: ProductDetailsStore,
    private productDetailsQuery: ProductDetailsQuery) {
  }

  ngOnInit() {

  }

  // ------------------ Akita ------------------

  fetchProductList() {
    this.fetchProductListLoader().subscribe();
    this.proudctListLoading$ = this.productQuery.selectLoading();
    this.productList$ = this.productQuery.selectAll();
  }

  private fetchProductListLoader(): Observable<Product[]> {
    const request = this.dataService.getProducts().pipe(
      tap(products => {
        // replace old state list by new state list
        // TODO: how main different product groups
        this.productStore.set(products);

        console.log('product store snapshot:');
        console.log(this.productQuery.getSnapshot());
      })
    )

    return this.productQuery.isPristine ? request : noop();
  }

  fetchProductDetails(productId: ID) {
    this.fetchProductDetailsLoader(productId).subscribe();
  }

  private fetchProductDetailsLoader(productId: ID): Observable<ProductDetails> {
    const request = this.dataService.getProductDetails(productId).pipe(
      tap(productDetails => {
        if (this.productDetailsQuery.getEntity(productId)) {
          this.productDetailsStore.update(productId, productDetails);
        } else {
          this.productDetailsStore.add(productDetails);
        }

        console.log('product details store snapshot:');
        console.log(this.productDetailsQuery.getSnapshot());
      })
    )

    return this.productDetailsQuery.isPristine ? request : noop();
  }

  // ------------------ Akita ------------------

  isProductSelected(productId: ID) {
    return this.selectedProductId === productId;
  }
}
