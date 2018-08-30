import { Product } from './data/product';
import { ProductDetails } from './data/product-details';

export class LoadProductList {
    static readonly type = 'LoadProductList';

    constructor(public productList: Product[]) {

    }
}

export class ToggleProduct {
    static readonly type = 'ToggleProduct';

    constructor(public productId: number | string) {

    }
}

export class ToggleProductDetails {
    static readonly type = 'ToggleProductDetails';

    constructor(public productId: number | string) {

    }
}

export class AddProductDetails {
    static readonly type = 'AddProductDetails';

    constructor(public productDetails: ProductDetails) {

    }
}
