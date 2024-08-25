import AxiosInstance from "./AxiosInstance"

export const createNewCategory = (data)=>{
    return AxiosInstance.post("admin/category",data);
}

export const deleteCategory = (id)=>{
    return AxiosInstance.delete(`admin/category/${id}`);
  }

  export const createItem = (data)=>{
    return AxiosInstance.post("admin/item",data);
}

export const deleteItem = (id)=>{
    return AxiosInstance.delete(`admin/item/${id}`);
  }

export const addItemToCart = (data) => {
    return AxiosInstance.put("/cart/add",data);
}

export const findUserCart = () => {
    return AxiosInstance.get("/cart");
}

export const findShopByUserId = () => {
    return AxiosInstance.get("shops/user");
}

export const updateCartItem = (data) => {
    return AxiosInstance.put("/cart-item/update",data);
}

export const createFeedback = (data)=>{
    return AxiosInstance.post("/feedback",data);
}

export const getShopByUserId = () => {
    return AxiosInstance.get("/shops/user");
}

export const createOrder = (data)=>{
    return AxiosInstance.post("/order",data);
}

export const getOrderHistory = () => {
    return AxiosInstance.get("/order/user");
}


export const getAllOrders = () => {
    return AxiosInstance.get("/admin/order");
}

export const updateOrderStatus = (id,order_status)=>{
    return AxiosInstance.put(`admin/order/${id}/${order_status}`);
  }

  export const removeCartItem = (id)=>{
    return AxiosInstance.delete(`cart-item/${id}/remove`);
  }

  export const getAllFeedbacks = () => {
    return AxiosInstance.get("admin/feedback");
}

export const updateItemAvailabilityStatus = (id)=>{
    return AxiosInstance.put(`admin/item/${id}`);
  }

export const updateItemDetails = async (id, updatedData) => {
    return AxiosInstance.put(`admin/item/update/${id}`, updatedData);
} 

export const clearCart = async () => {
    return AxiosInstance.put('cart/clear');
};

export const getAllItems = () => {
    return AxiosInstance.get("/item");
}
