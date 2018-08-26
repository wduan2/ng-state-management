import { Store } from "@datorama/akita";

/**
 * Determine which product need to be loaded.
 */
export class ProductDetailsLoadingStore extends Store<Product> {
    constructor() {
        super({});
    }
}
