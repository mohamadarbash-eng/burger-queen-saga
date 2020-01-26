import React from "react";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummery";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../ContactData/ContactData";

const Checkout = props =>  {

   const  checkoutCancelledHandler = () => {
        props.history.goBack();
    };

   const checkoutContinuedHandler = () => {
        props.history.replace("/checkout/contact-data");
    };


        let summary = <Redirect to="/"/>;
        if (props.ingredients && !props.purchased) {
            summary = (                <CheckoutSummary
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={props.ingredients}/>)
        }
        return (
            <React.Fragment>
                {summary}
                <Route path={`${props.match.path}/contact-data`} component={ContactData}/>
            </React.Fragment>
        )
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredient.ingredients,
        totalPrice: state.ingredient.totalPrice,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);
