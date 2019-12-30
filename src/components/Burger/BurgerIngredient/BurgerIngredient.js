import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css';

export const INGREDIENTS = {
    'breadBottom': 'bread-bottom',
    'breadTop' : 'bread-top',
    'meat': 'meat',
    'bacon': 'bacon',
    'salad': 'salad',
    'cheese': 'cheese'
}

class BurgerIngredient extends Component {
    render () {
        let ingredient = null;

        switch ( this.props.type ) {
            case ( INGREDIENTS.breadBottom):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ( INGREDIENTS.breadTop ):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ( INGREDIENTS.meat ):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ( INGREDIENTS.cheese ):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ( INGREDIENTS.bacon ):
                ingredient = <div className={classes.Bacon}></div>;
                break;
            case ( INGREDIENTS.salad ):
                ingredient = <div className={classes.Salad}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
