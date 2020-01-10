import React, { Component } from "react";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummery";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import * as actions from './../../store/actions/index';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };


    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients && !this.props.purchased) {
            summary = (                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ingredients}/>)
        }
        return (
            <React.Fragment>
                {summary}
                <Route path={`${this.props.match.path}/contact-data`} component={ContactData}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredient.ingredients,
        totalPrice: state.ingredient.totalPrice,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);
