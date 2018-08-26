import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Product } from "./data/product";
import { ProductState, ProductStore } from "./product-store";

@Injectable({
    providedIn: 'root'
})
export class ProductQuery extends QueryEntity<ProductState, Product>{
    constructor(protected store: ProductStore) {
        super(store);
    }
}
