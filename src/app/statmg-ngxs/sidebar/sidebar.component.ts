import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { Product } from '../data/product';
import { AddProductDetails, LoadProductList, ToggleProduct, ToggleProductDetails } from './../product.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  /**
   * - same as invoking this.store.select((state) => state.productStateModel.productList)
   * - store.select will return all the StateModels
   */
  @Select((state) => state.productStateModel.productList)
  productList$: Observable<Product[]>;

  isProductSelected$: Observable<boolean>;

  constructor(private store: Store, private dataService: DataService) {
    
  }

  ngOnInit() {

  }

  fetchProductList() {
    this.dataService.getProducts().subscribe((products) => {
      this.store.dispatch(new LoadProductList(products));
    });
  }

  onProductSelected(productId: number | string) {
    this.store.dispatch([
      new ToggleProduct(productId),
      new ToggleProductDetails(productId)
    ]);

    this.dataService.getProductDetails(productId).subscribe((productDetails) => {
      this.store.dispatch(new AddProductDetails(productDetails));
    })
  }

  isProductSelected(productId: number | string) {
    // only select one time
    return this.store.selectOnce((state) => {
      const product = state.productStateModel.productList.find((product) => product.id === productId);
      return product.selected;
    })
  }
}
