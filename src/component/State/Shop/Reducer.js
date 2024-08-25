import * as actionTypes from './ActionType';

const initialState = {
    shops:[],
    shop:null,
    usersShop:null,
    loading:false,
    error:null
};

export const shopReducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.CREATE_SHOP_REQUEST:
        case actionTypes.GET_ALL_SHOPS_REQUEST:
        case actionTypes.GET_SHOP_BY_USER_ID_REQUEST:
        case actionTypes.GET_SHOP_BY_ID_REQUEST:    
        case actionTypes.UPDATE_SHOP_REQUEST:
        case actionTypes.UPDATE_SHOP_STATUS_REQUEST:
        case actionTypes.DELETE_SHOP_REQUEST:
            return {
                ...state,
                loading:true,
                error:null
            };                
        case actionTypes.CREATE_SHOP_SUCCESS:
            return {
                ...state,
                loading:false,
                usersShop:action.payload
            };    
        case actionTypes.GET_SHOP_BY_ID_SUCCESS:
            return {
                ...state,
                loading:false,
                shop:action.payload
            };
        case actionTypes.GET_SHOP_BY_USER_ID_SUCCESS:
        case actionTypes.GET_ALL_SHOPS_SUCCESS:    
        case actionTypes.UPDATE_SHOP_STATUS_SUCCESS:
        case actionTypes.UPDATE_SHOP_SUCCESS:
            return {
                ...state,
                loading:false,
                shops:action.payload
            };
        case actionTypes.DELETE_SHOP_SUCCESS:
            return {
                ...state,
                error:null,
                loading:false,
                shops:state.shops.filter((item)=>item._id!==action.payload),
                usersShop:state.usersShop.filter((item)=>item._id!==action.payload)
            };   
        case actionTypes.CREATE_SHOP_FAILURE:
        case actionTypes.GET_ALL_SHOPS_FAILURE:
        case actionTypes.GET_SHOP_BY_ID_FAILURE:
        case actionTypes.GET_SHOP_BY_USER_ID_FAILURE:
        case actionTypes.UPDATE_SHOP_FAILURE:
        case actionTypes.UPDATE_SHOP_STATUS_FAILURE:
        case actionTypes.DELETE_SHOP_FAILURE:
            return {
                ...state,
                loading:false,
                error:action.payload
            };
        default:
            return state;                     
    }
};

