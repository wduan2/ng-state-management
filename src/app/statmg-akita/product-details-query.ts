import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ProductDetails } from "./data/product-details";
import { ProductDetailsState, ProductDetailsStore } from "./product-details-store";

/**
 * Determine which product need to be loaded.
 */
@Injectable({
    providedIn: 'root'
})
export class ProductDetailsQuery extends QueryEntity<ProductDetailsState, ProductDetails> {
    constructor(protected store: ProductDetailsStore) {
        super(store);
    }
}
