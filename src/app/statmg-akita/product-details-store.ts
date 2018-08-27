import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { ProductDetails } from "./data/product-details";

export interface ProductDetailsState extends EntityState<ProductDetails> {};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'productDetailsStore '})
export class ProductDetailsStore extends EntityStore<ProductDetailsState, ProductDetails> {
    constructor() {
        super();
    }
}
