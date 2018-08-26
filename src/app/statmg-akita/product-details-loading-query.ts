import { Query } from "@datorama/akita";
import { Product } from "./data/product";
import { ProductDetailsLoadingStore } from "./product-details-loading-store";
import { Injectable } from "@angular/core";

/**
 * Determine which product need to be loaded.
 */
@Injectable({
    providedIn: 'root'
})
export class ProductDetailsLoadingQuery extends Query<Product> {
    constructor(protected store: ProductDetailsLoadingStore) {
        super(store);
    }
}
