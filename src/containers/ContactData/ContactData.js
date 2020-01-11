import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { initFormState } from "./initialFormState";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "./../../store/actions/index";

class ContactData extends Component {
    state = {
        ...JSON.parse(JSON.stringify(initFormState))
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (rules && rules.required) {
            isValid = !!value && value.trim() && isValid;
        }
        if (rules && rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        for (let element in this.state.orderForm) {
            orderData[element] = this.state.orderForm[element].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token, this.props.userId)
    };

    inputChangeHandler = (event, key) => {
        const {value} = event.target;

        this.setState((prevState) => {
            const updatedForm = {
                ...prevState.orderForm
            };
            updatedForm[key].valid = this.checkValidity(value, updatedForm[key].validation);
            updatedForm[key].touched = true;
            updatedForm[key].value = value;
            let formIsValid = true;
            for (const _key in updatedForm) {
                formIsValid = updatedForm[_key].valid && formIsValid;
            }


            return {orderForm: updatedForm, formIsValid};
        });
    };

    setTouched = (key) => {
        this.setState((prevState) => {
            const updatedForm = {
                ...prevState.orderForm
            };
            updatedForm[key].touched = true;
            return {orderForm: updatedForm};
        });
    };

    render() {
        const orderFormArray = [];
        for (let key in this.state.orderForm) {
            orderFormArray.push({id: key, config: this.state.orderForm[key]})
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {orderFormArray.map(element => (
                    <Input key={element.id}
                           invalid={!element.config.valid}
                           elementType={element.config.elementType}
                           value={element.config.value}
                           shouldValidate={!!element.config.validation}
                           touched={element.config.touched}
                           setTouched={() => this.setTouched(element.id)}
                           change={(event) => this.inputChangeHandler(event, element.id)}
                           elementConfig={element.config.elementConfig}/>
                ))}
                <Button btnType={this.state.formIsValid ? "Success" : "Danger"}
                        disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredient.ingredients,
        totalPrice: state.ingredient.totalPrice,
        loading: state.order.loading,
        token:state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (order, token, userId) => dispatch(actions.purchaseBurger(order, token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));

