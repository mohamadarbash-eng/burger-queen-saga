import React, {Component} from "react";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummery';
import { Route } from 'react-router-dom';
import ContactData from "../ContactData/ContactData";

class Checkout extends Component{
        state = {
            ingredients: null,
            totalPrice: 0
        };


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = ()=> {
        this.props.history.replace('/checkout/contact-data');
    };

    componentWillMount() {
        const search = this.props.location.search;
        const query = new URLSearchParams(search);
        let price = 0;
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0] === 'totalPrice') {
                price = param[1];
            } else {
                ingredients[param[0]] = param[1];
            }

        }
        this.setState({ingredients, totalPrice: price});
    }


    render() {
 return (
     <React.Fragment>
         <CheckoutSummary
             checkoutCancelled={this.checkoutCancelledHandler}
             checkoutContinued={this.checkoutContinuedHandler}
             ingredients={this.state.ingredients}/>
             <Route path={`${this.props.match.path}/contact-data`} render={(props) => <ContactData {...props} ingredients = {this.state.ingredients} totalPrice={this.state.totalPrice}/>}/>
     </React.Fragment>
 )
    }
}


export default Checkout;
