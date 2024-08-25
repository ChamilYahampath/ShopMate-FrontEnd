import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { shopReducer } from "./Shop/Reducer";
import { itemReducer } from "./Item/Reducer";
import { categoryReducer } from "./Category/Reducer";


const rooteReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    shop: shopReducer,
    item: itemReducer,
    category: categoryReducer
});

export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));