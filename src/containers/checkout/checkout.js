import React, {Component} from "react";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummery';

class Checkout extends Component{

    render() {
 return (
     <React.Fragment>
         <CheckoutSummary ingredients={{salad: 1, meat: 1, bacon: 1}}/>
     </React.Fragment>
 )
    }
}


export default Checkout;
