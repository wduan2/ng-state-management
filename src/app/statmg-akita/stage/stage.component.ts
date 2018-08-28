import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductDetails } from '../data/product-details';
import { ProductDetailsQuery } from '../product-details-query';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  productDetails: ProductDetails[] = [];

  productDetails$: Observable<ProductDetails[]>;
  productDetailsLoading$: Observable<boolean>;

  constructor(private productDetailsQuery: ProductDetailsQuery) { }

  ngOnInit() {
    this.productDetailsLoading$ = this.productDetailsQuery.selectLoading();
    this.productDetails$ = this.productDetailsQuery.selectAll({ filterBy: (s) => s.display });
  }
}
