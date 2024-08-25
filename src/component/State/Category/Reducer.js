import * as actionTypes from './ActionType';

const initialState = {
    categories: [],
    loading: false,
    error: null,
    search: [],
    message: null
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.SEARCH_CATEGORY_REQUEST:
        case actionTypes.UPDATE_CATEGORY_REQUEST:
        case actionTypes.DELETE_CATEGORY_REQUEST:
        case actionTypes.GET_ALL_CATEGORIES_REQUEST:    
            return{
                ...state,
                loading: true,
                error: null,
                message: null
            };
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
                message: "Category created successfully"
            };
        case actionTypes.SEARCH_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                search: action.payload
            };
        case actionTypes.UPDATE_CATEGORY_SUCCESS:
            console.log("updated category id", action.payload.id)
            return{
                ...state,
                loading: false,
                categories: state.categories.map((category) => category.id === action.payload.id ? action.payload : category)
            };
        case actionTypes.GET_ALL_CATEGORIES_SUCCESS:
            return{
                ...state,
                loading: false,
                categories: action.payload
            };    
        case actionTypes.DELETE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                categories: state.categories.filter((category) => category.id!==action.payload),
                message: "Category deleted successfully"
            };
        case actionTypes.CREATE_CATEGORY_FAILURE:
        case actionTypes.SEARCH_CATEGORY_FAILURE:
        case actionTypes.UPDATE_CATEGORY_FAILURE:
        case actionTypes.DELETE_CATEGORY_FAILURE:
        case actionTypes.GET_ALL_CATEGORIES_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
        default:
            return state;
    }
}