import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductDetails } from '../data/product-details';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  productDetailsList$: Observable<ProductDetails[]>

  constructor(private store: Store) { }

  ngOnInit() {
    this.productDetailsList$ = this.store.select((state) => { 
      return state.productDetailsStateModel.productDetailsList.filter((productDetails) => productDetails.display);
    });
  }
}
