import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { Product } from "./data/product";

/**
 * Determine which product need to be loaded.
 */
@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'productDetailsLoadingStore '})
export class ProductDetailsLoadingStore extends Store<Product> {
    constructor() {
        super({});
    }
}
