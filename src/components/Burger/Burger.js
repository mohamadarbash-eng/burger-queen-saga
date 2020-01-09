import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    /*   his solution
     let transformedIngredients = Object.keys( props.ingredients )
            .map( igKey => {
                return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />;
                } );
            } )
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []); */

// my solution
    let transformedIngredients = [];
    for (const key in props.ingredients) {
        [...Array(props.ingredients[key])].forEach((_, index) => {
            const ingredient = <BurgerIngredient key={key + index} type={key}/>;
            transformedIngredients.push(ingredient);
        })
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients.length > 0 ? transformedIngredients : <p>Please start adding ingredients!</p>}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);
