import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "./../../store/actions/index";

export const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        this.props.onSetIngredients();
    }

    updatePurchaseState() {
        let ingredientsCount = 0;
        for (const key in this.props.ingredients) {
            ingredientsCount += this.props.ingredients[key];
        }
        return ingredientsCount > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.onAuthRedirect('/checkout');
          this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push({
            pathname: "/checkout",
        });
    };


    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummery = null;
        if (!!this.props.ingredients) {
            orderSummery = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }
        if (this.state.loading) {
            orderSummery = <Spinner/>;
        }
        let burger = this.props.error ? <p>Something is wrong please try later</p> : <Spinner/>;
        if (!!this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuth}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice}/>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredient.ingredients,
        totalPrice: state.ingredient.totalPrice,
        error: state.ingredient.error,
        isAuth: !!state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onSetIngredients: () => dispatch(actions.initIngredient()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));
