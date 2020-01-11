import actionsEnum from "./action-types";
import axiosInstance from "../../axios-orders";


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionsEnum.FETCH_ORDERS_SUCCESS,
        orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionsEnum.FETCH_ORDERS_FAIL,
        error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionsEnum.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        fetchOrdersStart();
        axiosInstance.get("/orders.json?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"')
            .then((orders) => {
                const fetchedOrders = [];
                for (let key in orders.data) {
                    fetchedOrders.push({...orders.data[key], id: key})
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
                alert("somthing went wrong checkout " + err)
            })
    }
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionsEnum.PURCHASE_BURGER_SUCCESS,
        id,
        orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionsEnum.PURCHASE_BURGER_FAIL,
        error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionsEnum.PURCHASE_BURGER_START
    };
};

export const purchaseInit = () => {
    return {
        type: actionsEnum.PURCHASE_INIT
    }
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axiosInstance.post("/orders.json?auth=" + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
};
