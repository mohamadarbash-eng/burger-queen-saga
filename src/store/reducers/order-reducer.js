import actionsEnum from "./../actions/action-types";

const initialState = {
    orders: [],
    loading: false,
    error: null,
    purchased: false
};


const orderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionsEnum.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionsEnum.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            };
        case actionsEnum.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionsEnum.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionsEnum.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionsEnum.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionsEnum.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
};

export default orderReducer;

