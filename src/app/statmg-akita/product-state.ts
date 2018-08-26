import { Product } from "./data/product";
import { ProductDetails } from "./data/product-details";

/**
 * Create a wrapper for holding product and product details. This wrapper is created
 * only for one requirement that is product details will be retrieved later.
 */
export class ProductState {

    private _product: Product;
    private _productDetails: ProductDetails;

    constructor(product: Product, productDetails: ProductDetails) {
        this._product = product;
        this._productDetails = productDetails;
    }

    get product() {
        return this._product;
    }

    get productDetails() {
        return this._productDetails;
    }
}
