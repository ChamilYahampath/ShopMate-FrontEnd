import * as actionTypes from './ActionType';

const initialState = {
    items: [],
    loading: false,
    error: null,
    search: [],
    message: null
};

export const itemReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CREATE_ITEM_REQUEST:
        case actionTypes.SEARCH_ITEM_REQUEST:
        case actionTypes.UPDATE_ITEMS_AVAILABILITY_REQUEST:
        case actionTypes.DELETE_ITEM_REQUEST:
        case actionTypes.GET_ALL_ITEMS_REQUEST:    
            return{
                ...state,
                loading: true,
                error: null,
                message: null
            };
        case actionTypes.CREATE_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                items: [...state.items, action.payload],
                message: "Item created successfully"
            };
        case actionTypes.SEARCH_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                search: action.payload
            };
        case actionTypes.GET_ALL_ITEMS_SUCCESS:
            return{
                ...state,
                loading: false,
                items: action.payload
            };
        case actionTypes.UPDATE_ITEMS_AVAILABILITY_SUCCESS:
            console.log("updated items id", action.payload.id)
            return{
                ...state,
                loading: false,
                items: state.items.map((item) => item.id === action.payload.id ? action.payload : item)
            };
        case actionTypes.DELETE_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                items: state.items.filter((item) => item.id!==action.payload),
                message: "Item deleted successfully"
            };
        case actionTypes.CREATE_ITEM_FAILURE:
        case actionTypes.SEARCH_ITEM_FAILURE:
        case actionTypes.UPDATE_ITEMS_AVAILABILITY_FAILURE:
        case actionTypes.DELETE_ITEM_FAILURE:
        case actionTypes.GET_ALL_ITEMS_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
        default:
            return state;
    }
};
