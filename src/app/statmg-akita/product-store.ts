import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Product } from "./data/product";

export interface ProductState extends EntityState<Product> {};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'productStore '})
export class ProductStore extends EntityStore<ProductState, Product> {
    constructor() {
        super();
    }
}
