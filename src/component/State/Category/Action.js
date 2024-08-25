import { api } from '../../config/api';
import {createNewCategory} from '../../../ApiService/Api'
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, GET_ALL_CATEGORIES_FAILURE, GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, SEARCH_CATEGORY_FAILURE, SEARCH_CATEGORY_REQUEST, SEARCH_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS } from './ActionType';

// export const createCategory = ({reqData,jwt}) => {
//     return async (dispatch) => {
//         dispatch({ type: CREATE_CATEGORY_REQUEST });
//         try {
//             const res = await createNewCategory(reqData)
//             console.log("created category", res.data);
//             dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
//         } catch (error) {
//             console.log("create category error", error);
//             dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
//         }
//     };
// }

export const searchCategory = ({keyword,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_CATEGORY_REQUEST });
        try {
            const { data } = await api.get(`api/category/search?name=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("search category", data);
            dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: data });
        } catch (error) {
            console.log("search category error", error);
            dispatch({ type: SEARCH_CATEGORY_FAILURE, payload: error });
        }
    };
}

export const updateCategory = ({categoryId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        try {
            const { data } = await api.put(`api/admin/category/${categoryId}`, {} , {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("updated category", data);
            dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
        }
        catch (error) {
            console.log("update category error", error);
            dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: error });
        }
    }
}

// export const deleteCategory = ({categoryId,jwt}) => {
//     return async (dispatch) => {
//         dispatch({ type: DELETE_CATEGORY_REQUEST });
//         try {
//             const { data } = await api.delete(`api/admin/category/${categoryId}`, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 }
//             });
//             console.log("deleted category", data);
//             dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
//         } catch (error) {
//             console.log("delete category error", error);
//             dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error });
//         }
//     };
// }

export const getAllCategories = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
        try {
            const { data } = await api.get('api/admin/category', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("get all categories", data);
            dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: data });
        } catch (error) {
            console.log("get all categories error", error);
            dispatch({ type: GET_ALL_CATEGORIES_FAILURE, payload: error });
        }
    };
}