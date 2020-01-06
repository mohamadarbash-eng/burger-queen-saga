import React, {Component} from "react";
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: '',
    email:'',
    address: {
        street: '',
        postalCode: ''
    },
      loading: false,

  };

  orderHandler = (event) => {
      event.preventDefault();
            const data = {
          ingredients: this.props.ingredients,
           totalPrice: this.props.totalPrice,
          customer: {
              name: 'mo',
              address: {
                  street: 'test 1',
                  zipCode: '0000',
                  country: 'Germany'
              },
              email: 'test@test.com',
              deliveryMethod: 'fasttest'
          }
      };
      this.setState( {loading: true});
      axiosInstance.post('/orders.json', data)
          .then((_) => {
            this.setState({loading: false});
            this.props.history.push('/');
          })
          .catch(error => {
              this.setState({loading: false});
          })


  };


    render() {
        let form =(
            <form action="">
                <input className={classes.Input} type="text" name="name" placeholder="please enter your Name"/>
                <input className={classes.Input} type="text" name="email" placeholder="please enter your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="please enter your Street"/>
                <input className={classes.Input} type="text" name="postalCode" placeholder="please enter your PostalCode"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form =  <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}


export default ContactData;
