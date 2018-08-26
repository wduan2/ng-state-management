import { EntityState, EntityStore } from "@datorama/akita";
import { ProductState } from "./product-state";
import { Injectable } from "@angular/core";

export interface ProductEntity extends EntityState<ProductState> {};

@Injectable({
    providedIn: 'root'
})
export class ProductStore extends EntityStore<ProductEntity, ProductState> {
    constructor() {
        super();
    }
}
