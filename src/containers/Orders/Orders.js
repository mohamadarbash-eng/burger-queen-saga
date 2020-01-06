import React, {Component} from "react";
import Order from '../../components/Order/Order';
import axiosInstance from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };


    componentDidMount() {
        axiosInstance.get('/orders.json')
            .then((orders) => {
                this.setState({loading: false});
                const fetchedOrders = [];
                for (let key in orders.data) {
                    fetchedOrders.push({...orders.data[key], id: key})
                }

                this.setState({orders: fetchedOrders})
            })
            .catch(err => {
                alert('somthing went wrong checkout ' + err)
            })
    }

    render() {
        const orders = this.state.orders.map((order) => <Order ingredients={order.ingredients} price={+order.totalPrice} key={order.id}/>);
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axiosInstance);
