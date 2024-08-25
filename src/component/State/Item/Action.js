import { api } from '../../config/api';
import { CREATE_ITEM_FAILURE, CREATE_ITEM_REQUEST, CREATE_ITEM_SUCCESS, DELETE_ITEM_FAILURE, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, GET_ALL_ITEMS_FAILURE, GET_ALL_ITEMS_REQUEST, GET_ALL_ITEMS_SUCCESS, SEARCH_ITEM_FAILURE, SEARCH_ITEM_REQUEST, SEARCH_ITEM_SUCCESS, UPDATE_ITEMS_AVAILABILITY_FAILURE, UPDATE_ITEMS_AVAILABILITY_REQUEST, UPDATE_ITEMS_AVAILABILITY_SUCCESS } from './ActionType';

// export const createItem = ({item,jwt}) => {
//     return async (dispatch) => {
//         dispatch({ type: CREATE_ITEM_REQUEST });
//         try {
//             const { data } = await api.post('api/admin/item', item, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`
//                 }
//             });
//             console.log("created item", data);
//             dispatch({ type: CREATE_ITEM_SUCCESS, payload: data });
//         } catch (error) {
//             console.log("create item error", error);
//             dispatch({ type: CREATE_ITEM_FAILURE, payload: error });
//         }
//     };
// };

export const searchItem = ({keyword,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_ITEM_REQUEST });
        try {
            const { data } = await api.get(`api/item/search?name=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("search item", data);
            dispatch({ type: SEARCH_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("search item error", error);
            dispatch({ type: SEARCH_ITEM_FAILURE, payload: error });
        }
    };
}

export const updateItemsAvailability = ({itemId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ITEMS_AVAILABILITY_REQUEST });
        try {
            const { data } = await api.put(`api/admin/item/${itemId}`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("updated item availability", data);
            dispatch({ type: UPDATE_ITEMS_AVAILABILITY_SUCCESS, payload: data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: UPDATE_ITEMS_AVAILABILITY_FAILURE, payload: error });
        }
    };
}

export const deleteItemAction = ({itemId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_ITEM_REQUEST });
        try {
            const { data } = await api.delete(`api/admin/item/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("deleted item", data);
            dispatch({ type: DELETE_ITEM_SUCCESS, payload: itemId });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: DELETE_ITEM_FAILURE, payload: error });
        }
    };
}

export const getAllItems = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_ITEMS_REQUEST });
        try {
            const { data } = await api.get('api/item', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("get all items", data);
            dispatch({ type: GET_ALL_ITEMS_SUCCESS, payload: data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: GET_ALL_ITEMS_FAILURE, payload: error });
        }
    };
}