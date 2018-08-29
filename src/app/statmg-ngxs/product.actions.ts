import { Product } from './data/product';
import { ProductDetails } from './data/product-details';

export class LoadProductList {
    static readonly type = 'LoadProductList';

    constructor(public productList: Product[]) {

    }
}

export class AddProductDetails {
    static readonly type = 'AddProductDetails';

    constructor(public productDetails: ProductDetails) {

    }
}

export class RemoveProductDetails {
    static readonly type = 'RemoveProductDetails';

    constructor(public productId: number | string) {

    }
}
