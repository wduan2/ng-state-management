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
        // TODO: how to maintain different product groups
        this.productStore.set(products);

        console.debug('product store snapshot:');
        console.debug(this.productQuery.getSnapshot());
      })
    )

    return this.productQuery.isPristine ? request : noop();
  }

  onProductSelected(productId: ID) {
    if (this.productDetailsQuery.hasEntity(productId)) {
      this.toggleProductDetails(productId);
    } else {
      this.fetchProductDetailsLoader(productId).subscribe(() => {
        this.productDetailsStore.setLoading(false);
      });
    }
  }

  private toggleProductDetails(productId: ID) {
    // toggle sidebar style
    const oldProductState = this.productQuery.getEntity(productId);
    this.productStore.update(productId, { selected: !oldProductState.selected });

    // toggle stage cards
    const oldProductDetailsState = this.productDetailsQuery.getEntity(productId);
    this.productDetailsStore.update(productId, { display: !oldProductDetailsState.display });
    console.debug('product details store snapshot:');
    console.debug(this.productDetailsQuery.getSnapshot());
  }

  private fetchProductDetailsLoader(productId: ID): Observable<ProductDetails> {
    const request = this.dataService.getProductDetails(productId).pipe(
      tap(productDetails => {
        productDetails.display = true;
        this.productDetailsStore.add(productDetails);
        this.productStore.update(productId, { selected: true });
        console.debug('product details store snapshot:');
        console.debug(this.productDetailsQuery.getSnapshot());
      })
    )

    return this.productDetailsQuery.isPristine ? request : noop();
  }

  // ------------------ Akita ------------------

  isProductSelected(productId: ID) {
    return this.productQuery.hasEntity(productId) && this.productQuery.getEntity(productId).selected;
  }
}
