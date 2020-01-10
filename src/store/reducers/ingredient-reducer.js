import actionsEnum from "./../actions/action-types";
import { INGREDIENT_PRICES } from "./../../containers/BurgerBuilder/BurgerBuilder";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const ingredientReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionsEnum.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };

        case actionsEnum.REMOVE_INGREDIENT:
            const currentIngredient = state.ingredients[action.ingredientName];
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: currentIngredient > 1 ? currentIngredient - 1 : 0,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionsEnum.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: initialState.totalPrice
            };
        case actionsEnum.SET_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default ingredientReducer;

