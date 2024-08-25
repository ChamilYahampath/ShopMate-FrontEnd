import { api } from "../../config/api";
import { CREATE_SHOP_FAILURE, CREATE_SHOP_REQUEST, CREATE_SHOP_SUCCESS, DELETE_SHOP_FAILURE, DELETE_SHOP_REQUEST, DELETE_SHOP_SUCCESS, GET_ALL_SHOPS_FAILURE, GET_ALL_SHOPS_REQUEST, GET_ALL_SHOPS_SUCCESS, GET_SHOP_BY_ID_FAILURE, GET_SHOP_BY_ID_REQUEST, GET_SHOP_BY_ID_SUCCESS, GET_SHOP_BY_USER_ID_FAILURE, GET_SHOP_BY_USER_ID_REQUEST, GET_SHOP_BY_USER_ID_SUCCESS, UPDATE_SHOP_FAILURE, UPDATE_SHOP_REQUEST, UPDATE_SHOP_STATUS_FAILURE, UPDATE_SHOP_STATUS_REQUEST, UPDATE_SHOP_STATUS_SUCCESS, UPDATE_SHOP_SUCCESS } from "./ActionType";


export const getAllShopsAction = (token) => {
    return async (dispatch) => {
        dispatch({type:GET_ALL_SHOPS_REQUEST});
        try {
            const {data} = await api.get("/api/admin/shops", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            dispatch({type:GET_ALL_SHOPS_SUCCESS,payload:data});
            console.log("all shops",data);
        } 
        catch (error) {
            console.log("error",error);
            dispatch({type:GET_ALL_SHOPS_FAILURE,payload:error});
        }
    };
}

export const getShopById = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_SHOP_BY_ID_REQUEST});
        try {
            const response = await api.get(`/api/admin/shops/${reqData.shopId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            }
            );
            dispatch({type:GET_SHOP_BY_ID_SUCCESS,payload:response.data});
        } 
        catch (error) {
            console.log("error",error);
            dispatch({type:GET_SHOP_BY_ID_FAILURE,payload:error});
        }
    };
}

// export const getShopByUserId = (jwt) => {
//     return async (dispatch) => {
//         dispatch({type:GET_SHOP_BY_USER_ID_REQUEST});
//         try {
//             const {data} = await api.get(`/api/shops/user`, {
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             }
//             );
//             dispatch({type:GET_SHOP_BY_USER_ID_SUCCESS,payload:data});
//             console.log("shop by user id",data);
//         } 
//         catch (error) {
//             console.log("error",error);
//             dispatch({type:GET_SHOP_BY_USER_ID_FAILURE,payload:error});
//         }
//     };
// }

export const createShop = (reqData) => {
    console.log("token:",reqData.token)
    return async (dispatch) => {
        dispatch({type:CREATE_SHOP_REQUEST});
        try {
            const {data} = await api.post(`/api/shops`,reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({type:CREATE_SHOP_SUCCESS,payload:data});
            console.log("shop created",data);
        } 
        catch (error) {
            console.log("error",error);
            dispatch({type:CREATE_SHOP_FAILURE,payload:error});
        }
    };
}

export const updateShop = ({shopId,shopData,jwt}) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_SHOP_REQUEST});
        try {
            const res = await api.put(`/api/shops/${shopId}`,shopData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type:UPDATE_SHOP_SUCCESS,payload:res.data});
        } 
        catch (error) {
            dispatch({type:UPDATE_SHOP_FAILURE,payload:error});
        }
    };
}

export const deleteShop = ({shopId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:DELETE_SHOP_REQUEST});
        try {
            const res = await api.delete(`/api/shops/${shopId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("delete shop",res.data);
            dispatch({type:DELETE_SHOP_SUCCESS,payload:shopId});
        } 
        catch (error) {
            console.log("error",error);
            dispatch({type:DELETE_SHOP_FAILURE,payload:error});
        }
    };
}

export const updateShopStatus = ({shopId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_SHOP_STATUS_REQUEST});
        try {
            const res = await api.put(`/api/shops/${shopId}/status`,{}, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("update shop status",res.data);
            dispatch({type:UPDATE_SHOP_STATUS_SUCCESS,payload:res.data});
        } 
        catch (error) {
            console.log("error",error);
            dispatch({type:UPDATE_SHOP_STATUS_FAILURE,payload:error});
        }
    };
}


