import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Product } from './data/product';
import { ProductDetails } from './data/product-details';
import { AddProductDetails, LoadProductList, ToggleProduct, ToggleProductDetails } from './product.actions';

export class ProductStateModel {
    productList: Product[];
}

export class ProductDetailsStateModel {
    productDetailsList: ProductDetails[];
}

@State<ProductStateModel>({
    name: 'productStateModel',
    defaults: {
        productList: []
    }
})
export class ProductState {

    @Selector()
    static getProductList(productStateModel: ProductStateModel) {
        return productStateModel.productList;
    }

    // must NOT be static
    @Action(LoadProductList)
    loadProductList({ setState }: StateContext<ProductStateModel>, { productList }: LoadProductList) {
        setState({
            productList: productList
        });
    }

    @Action(ToggleProduct)
    toggleProduct({ getState, patchState }: StateContext<ProductStateModel>, { productId }: ToggleProduct) {
        const oldProductList = getState().productList;
        const newProductList = oldProductList.map((product) => {
            if (product.id === productId) {
                product.selected = !product.selected;
            }
            return product;
        });
        patchState({
            productList: newProductList 
        })
    }
}

@State<ProductDetailsStateModel>({
    name: 'productDetailsStateModel',
    defaults: {
        productDetailsList: []
    }
})
export class ProductDetailsState {
    @Selector()
    static getProductDetailsList(productDetailsStateModel: ProductDetailsStateModel) {
        return productDetailsStateModel.productDetailsList;
    }

    @Action(ToggleProductDetails)
    toggleProductDetails({ getState, patchState }: StateContext<ProductDetailsStateModel>, { productId }: ToggleProductDetails) {
        const oldProductDetailsList = getState().productDetailsList;
        const newProductDetailsList = oldProductDetailsList.map((productDetails) => {
            if (productDetails.productId === productId) {
                productDetails.display = !productDetails.display;
            }
            return productDetails;
        });
        patchState({
            productDetailsList: newProductDetailsList 
        })
    }

    @Action(AddProductDetails)
    addProductDetails({ getState, patchState }: StateContext<ProductDetailsStateModel>, { productDetails }: AddProductDetails) {
        const oldProductDetailsList = getState().productDetailsList;

        // do nothing if the details of one product has been loaded
        if (!oldProductDetailsList.find((existing) => existing.productId === productDetails.productId)) {
            productDetails.display = true;
            patchState({
                productDetailsList: [...oldProductDetailsList, productDetails]
            });
        }
    }
}
