import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { ProductState } from "./product-state";
import { ProductEntity, ProductStore } from "./product-store";

@Injectable({
    providedIn: 'root'
})
export class ProductQuery extends QueryEntity<ProductEntity, ProductState>{
    constructor(protected store: ProductStore) {
        super(store);
    }
}
