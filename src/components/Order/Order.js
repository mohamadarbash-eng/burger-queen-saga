import React from "react";
import classes from './Order.module.css';

const Order = (props) => {
    const transformedIngredients = [];
    for (const key in props.ingredients) {
            transformedIngredients.push({name: key, amount: props.ingredients[key]});
    }
    const ingredientsOutput = transformedIngredients.map((ingredient) => {
        return <span
            style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}
            key={ingredient.name}> {ingredient.name} ({ingredient.amount})</span>
        });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong> </p>
        </div>
    )
}

export default Order
