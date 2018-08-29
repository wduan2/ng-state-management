import { LoadProductList, AddProductDetails, RemoveProductDetails } from './product.actions';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from './data/product';
import { ProductDetails } from './data/product-details';

export class ProductStateModel {
    productList: Product[];
}

export class ProductDetailsStateModel {
    productDetailsList: ProductDetails[];
}

@State<ProductStateModel>({
    name: 'productList',
    defaults: {
        productList: []
    }
})
export class ProductState {

    @Selector()
    static getProductList(state: ProductStateModel) {
        return state.productList;
    }

    @Action(LoadProductList)
    loadProductList({ getState, patchState }: StateContext<ProductStateModel>, { productList }: LoadProductList) {
        const oldState = getState();
        patchState({
            productList: productList
        });
    }
}

@State<ProductDetailsStateModel>({
    name: 'productDetailsList',
    defaults: {
        productDetailsList: []
    }
})
export class ProductDetailsState {
    @Selector()
    static getProductDetailsList(state: ProductDetailsStateModel) {
        return state.productDetailsList;
    }

    @Action(AddProductDetails)
    addProductDetails({ getState, patchState }: StateContext<ProductDetailsStateModel>, { productDetails }: AddProductDetails) {
        const oldState = getState();
        patchState({
            productDetailsList: [...oldState.productDetailsList, productDetails]
        });
    }

    @Action(RemoveProductDetails)
    RemoveProductDetails({ getState, patchState }: StateContext<ProductDetailsStateModel>, { productId }: RemoveProductDetails) {
        const oldState = getState();
        patchState({
            productDetailsList: oldState.productDetailsList.filter((s) => s.productId !== productId)
        });
    }
}
