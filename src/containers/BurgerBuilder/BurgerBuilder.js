import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axiosInstance.get('https://burger-queen-92f6d.firebaseio.com/ingredients,json', {
            headers: {
                "key" : "Access-Control-Allow-Origin",
                "value" : "*"
            }
        })
            .then((response) => {
                this.setState({ingredients: response.data })
            }).catch( (error)=> this.setState({error}))
    }

    updatePurchaseState (ingredients) {
/*      his solution

 const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
 */
// my solution

        let ingredientsCount = 0;
        for(const key in ingredients ) {
            ingredientsCount += ingredients[key];
        }
        this.setState( { purchasable: ingredientsCount > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            .then((response) => console.log(response))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({loading: false, purchasing: false});
            })
    };


    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummery = null;
        if (!!this.state.ingredients) {
            orderSummery =   <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummery = <Spinner/>;
        }

        let burger = this.state.error ? <p>Something is wrong please try later</p>   : <Spinner/>;
        if (!!this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
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

export default withErrorHandler(BurgerBuilder, axiosInstance);
