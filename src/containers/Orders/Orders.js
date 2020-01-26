import React, { Component, useEffect } from "react";
import Order from "../../components/Order/Order";
import axiosInstance from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = props => {

    useEffect(() => {
        if (props.token) {
            props.onFetchOrders(props.token, props.userId);
        } else {
            props.history.push('/auth');
        }
    }, []);


        let orders = <Spinner/>;
        if (!props.loading) {
            orders = props.orders.map((order) => <Order ingredients={order.ingredients} price={+order.totalPrice}
                                                             key={order.id}/>);
        }
        return (
            <div>
                {orders}
            </div>
        );
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));
